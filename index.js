var fs = require("fs");
var path = require("path");
var list = [];
function listFile(dir){
	var arr = fs.readdirSync(dir);
	arr.forEach(function(item){
		var fullpath = path.join(dir,item);
		var stats = fs.statSync(fullpath);
		if(stats.isDirectory()){
			listFile(fullpath);
		}else{
			list.push(fullpath);
		}
	});
	return list;
}
 
var res = listFile("./docs/");
res = res.filter(item => item.includes('.md')).map(item => item.split('/'))

function generateFileTree(arr) {
  // 定义一个空的文件树对象
  const fileTree = { items: [] };
  // 遍历二维数组中的每个文件路径
  arr.forEach(path => {
    // 定义一个指针，指向当前文件树对象
    let current = fileTree;
    // 遍历当前文件路径中的每个文件夹
    path.forEach(folder => {
      // 查找当前文件夹是否已经存在于文件树对象中
      let folderObj = current.items.find(child => child.name === folder);
      // 如果不存在，则创建一个新的文件夹对象，并添加到当前文件树对象的items数组中
      if (!folderObj) {
        folderObj = { name: folder, items: [] };
        current.items.push(folderObj);
      }
      // 将指针指向当前文件夹对象
      current = folderObj;
    });
    // 创建一个新的文件对象，并添加到当前文件夹对象的items数组中
    const fileObj = { name: path[path.length - 1], href: path[path.length - 1], type: 'markdown' };
    current.items.push(fileObj);
  });
  // 返回文件树对象
  return fileTree;
}

const result = generateFileTree(res)
console.log(JSON.stringify(result))