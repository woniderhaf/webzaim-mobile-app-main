const FileSelector = () => `<!DOCTYPE html>
<html lang='ru'>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8">

	<style>
		body {
			background-color: #F5F6FA;
			font-family: Arial, Helvetica, sans-serif;
			padding: 0;
			margin: 0;
			font-size: 14px;
		}

		main {
			padding: 32px 16px;
			max-width: 600px;
			margin: 0 auto;
		}

		.alert {
			background-color: #EDEEF2;
			color: #676977;
			padding: 16px 12px;
			line-height: 1.4;
			margin-bottom: 24px;
			border-radius: 14px;
		}

		.btn {
			display: block;
			border-radius: 7px;
			text-align: center;
			padding: 11px 20px;
			font-size: 16px;
		}

		.btn-light {
			color: #172A56;
			box-shadow: 0px 0px 0px 1px #D7DEE9 inset;
		}

		.btn-primary {
			color: #FFFFFF;
			background-color: #2B56B9;
		}

		.hidden {
			display: none;
		}

		.error {
			color: #172A56;
			background-color: #FEDEDE;
			border-radius: 14px;
			padding: 18px 12px;
			margin-bottom: 24px;
		}

		.btn+.btn {
			margin-top: 16px;
		}
	</style>

	<script>
		const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mb

		function showError() {
			document.getElementById('error').classList.remove('hidden');
		}

		function onFileSelect(files) {
			if (!files.length) {
				return;
			}

			const file = files[0];

			if (file.size > MAX_FILE_SIZE) {
				showError();
				return;
			}

			const reader = new FileReader();

			reader.onloadend = function () {
				// alert(reader.result.toString());
				window.ReactNativeWebView.postMessage(reader.result.toString());
			}

			reader.readAsDataURL(file);
		}
	</script>
</head>

<body>
	<main>
		<div class="error hidden" id="error">
			Размер выбранного файла превышает 4 Мб
		</div>

		<div class="alert">
			Разрешено загружать изображения в формате pdf, png, jpeg, heic. Размер файла не более 4&nbsp;Мб. Фото должно
			быть качественным, без размытия и бликов. Постарайтесь не&nbsp;заслонять пальцами текст на снимке.
		</div>

		<input onChange="onFileSelect(this.files)" type="file" id="camera" accept="image/*" capture="environment" hidden />
		<input onChange="onFileSelect(this.files)" type="file" id="upload" accept="image/*" hidden />

<!--		<label class="btn btn-primary" for="camera">Сделать фото</label>-->
		<label class="btn btn-primary" for="upload">Прикрепить файл</label>
	</main>
</body>

</html>
`;

export default FileSelector();
