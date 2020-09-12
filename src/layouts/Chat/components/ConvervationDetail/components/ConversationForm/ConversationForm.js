import React, { Fragment, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Avatar, Divider, IconButton, Input, Paper, Tooltip } from '@material-ui/core';
import { Send as SendIcon, AddPhotoAlternate as AddPhotoIcon, AttachFile as AttachFileIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { set, get } from 'lodash';

import * as actions from '../../../../../../store/actions';
import { generateBase64FromImage } from '../../../../../../utils/generateBase64FromImage';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#fff',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(1, 2)
	},
	paper: {
		flexGrow: 1,
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5, 2)
	},
	input: {
		width: '100%'
	},
	divider: {
		width: 1,
		height: 24
	},
	fileInput: {
		display: 'none'
	}
}));

const ConversationForm = (props) => {
	const { className, avatar, roomId, sendMessage, username, socket, imagePreview, setImagePreview, ...rest } = props;
	const fileTypes = [ 'image', 'file' ];

	const classes = useStyles();

	const [ value, setValue ] = useState({
		content: '',
		type: 'text'
	});

	const imageInputRef = useRef(null);
	const fileInputRef = useRef(null);

	const sender = {
		avatar: avatar
	};

	useEffect(
		() => {
			if (fileTypes.includes(get(value, 'type')) && !imagePreview) {
				setValue({
					...value,
					type: 'text'
				});
			}
		},
		[ imagePreview ]
	);

	const handleChange = (event) => {
		event.persist();

		setValue({
			content: event.target.value,
			type: 'text'
		});
	};

	const keyPressed = (event) => {
		if (event.which === 13) {
			onSendHandler();
		}
	};

	const onSendHandler = (event) => {
		if (value === '' && !fileTypes.includes(get(value, 'type'))) {
			return;
		}
		const message = {
			username: username,
			avatar: avatar,
			content: get(value, 'content'),
			contentType: get(value, 'type'),
			createdAt: moment()
		};

		if (fileTypes.includes(get(value, 'type'))) {
			set(message, 'file', get(value, 'file'));
			set(message, 'fileName', get(value, 'fileName'));
		}
		sendMessage(socket, message, roomId);
		setValue({
			content: '',
			type: 'text'
		});
		setImagePreview(null);
	};

	const handleImageAttach = () => {
		imageInputRef.current.click();
	};

	const handleFileAttach = () => {
		fileInputRef.current.click();
	};

	const handleImagePicker = (event) => {
		const files = event.target.files;
		const file = files[0];

		if (files) {
			generateBase64FromImage(file)
				.then((b64) => {
					setValue({
						...value,
						file: b64,
						fileName: file.name,
						type: 'image'
					});
					setImagePreview(b64);
				})
				.catch((err) => setImagePreview(null));
		}
	};

	const handleFilePicker = (event) => {
		const files = event.target.files;
		const file = files[0];

		try {
			setValue({
				...value,
				file,
				fileName: file.name,
				type: 'file'
			});
		} catch (err) {
			setImagePreview(null);
		}

		setImagePreview('/images/icons8-file.svg');
		// if (files) {
		//   generateBase64FromImage(file)
		//     .then(b64 => {
		//       setValue({
		//         ...value,
		//         file: b64,
		//         fileName: file.name,
		//         type: 'file'
		//       });
		//       setImagePreview('/images/icons8-file.svg');
		//     })
		//     .catch(err => setImagePreview(null));
		// }
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Avatar alt="Person" src={sender.avatar} />
			<Paper className={classes.paper} elevation={1}>
				<Input
					className={classes.input}
					disableUnderline
					autoFocus
					value={get(value, 'content')}
					onKeyPress={keyPressed}
					onChange={handleChange}
					placeholder="Leave a message"
				/>
			</Paper>
			<Tooltip onClick={onSendHandler} title="Send">
				<IconButton color={value.length > 0 ? 'primary' : 'default'}>
					<SendIcon />
				</IconButton>
			</Tooltip>
			<Divider className={classes.divider} />
			<Tooltip title="Attach photo">
				<IconButton edge="end" onClick={handleImageAttach}>
					<AddPhotoIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Attach file">
				<IconButton edge="end" onClick={handleFileAttach}>
					<AttachFileIcon />
				</IconButton>
			</Tooltip>
			<input
				className={classes.fileInput}
				ref={imageInputRef}
				onChange={handleImagePicker}
				type="file"
				accept="image/*"
			/>
			<input className={classes.fileInput} ref={fileInputRef} onChange={handleFilePicker} type="file" />
		</div>
	);
};

ConversationForm.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = (state) => ({
	username: state.auth.username,
	avatar: state.auth.avatar,
	socket: state.chat.socket
});

const mapDispatchToProps = (dispatch) => ({
	sendMessage: (socket, message, roomId) => dispatch(actions.chatSendMessageInit(socket, message, roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationForm);
