/*
	author:jifengdehao
	date:2016-10-5
*/
function PreviewPicture(selector, mySetting) {
	function PreviewPicture (selector, mySetting) {
		
		this.addBox = document.querySelector(selector);
		this.aInput = []; //存储创建的type file
		this.setting = {
			addTrue: function (oInput, oFiles, oImage) {
			},
			addFalse: function () {
				alert('只能选择图片');
			}
		};
		
		for (var attr in mySetting) {
			this.setting[attr] = mySetting[attr];
		}		
		this.init();
	}
	
	PreviewPicture.prototype = {
		init: function () { //初始化程序，绑定标签
			var _this = this;
	
			this.addBox.addEventListener('click', function () {
				
				_this.openWindow();
			},false);
		},
		openWindow: function (obj) { //打开窗口
			var _this = this;
			if (obj) {
				return obj.click();
			} 
			
			var aInput = this.aInput;
			for (var i=0;i<aInput.length;i++) { //查找是否存在没选择文件的标签
	
				if (aInput[i].files.length == 0) {
					return aInput[i].click();
				}
			}
	
			var oFile = document.createElement('input'); //创建文件标签
			oFile.type = 'file';
			oFile.style.display = 'none';
	
			oFile.addEventListener('change', function () {
				_this.change(this);
			}, false);
			
			aInput.push(oFile);
			console.log(aInput);
			return aInput[aInput.length - 1].click();
		},
		change: function (oFile) {
			var oFiles = oFile.files[0];
			var _this = this;
			if (oFiles && /image\/\w+/.test(oFiles.type)) {
				var reader = new FileReader(); 
				reader.readAsDataURL(oFiles); 
			
				reader.onload = function(e){ 
					_this.setting.addTrue(oFile, oFiles, this);
				}
			} else {
				
				this.setting.addFalse();
			}
		}
		
	};
	
	return new PreviewPicture(selector, mySetting);
}