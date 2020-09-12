import _ from 'lodash';

import axios from '../utils/axios';

const s3BucketDomain = 'https://s3-my-blog-bucket-220597.s3-ap-southeast-1.amazonaws.com';
export const upload = async (fileBase64, fileName, contentType) => {
	const token = await localStorage.getItem('token');
	let filetype;
	let file;

	if (contentType === 'image') {
		filetype = fileBase64.replace(/^data:([a-zA-Z/]+);.*/, '$1');
		file = await fetch(fileBase64)
			.then((res) => res.blob())
			.then((blob) => new File([ blob ], fileName, { type: filetype }));
	} else {
		file = fileBase64;
		filetype = file.type;
	}

	let uploadConfig;
	try {
		uploadConfig = await axios.get('/api/upload', {
			params: {
				filetype
			},
			headers: {
				Authorization: token
			}
		});

		await axios.put(uploadConfig.data.url, file, {
			headers: {
				'Content-Type': filetype
			}
		});
	} catch (err) {
		console.log(err);
	}
	return `${s3BucketDomain}/${_.get(uploadConfig, 'data.filename', null)}`;
};
