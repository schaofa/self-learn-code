const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const mysql = require("mysql2"); // 引入 mysql2 库

// 创建 MySQL 连接
const connection = mysql.createConnection({
  host: "localhost", // MySQL 服务器地址
  user: "root", // 用户名
  password: "root", // 密码
  database: "imgs-pro", // 数据库名称
});

// 爬取网页中的图片
async function fetchImages(url) {
  try {
    // 获取网页内容
    const { data } = await axios.get(url);

    // 使用 cheerio 加载 HTML
    const $ = cheerio.load(data);

    // 获取所有 img 标签的 src 属性
    const imgUrls = [];
    $("img").each((i, img) => {
      const imgSrc = $(img).attr("src");
      if (imgSrc) {
        imgUrls.push(imgSrc);
      }
    });

    // 下载图片
    downloadImages(imgUrls);
  } catch (error) {
    console.error("爬取页面失败:", error);
  }
}

// 下载图片
async function downloadImages(imgUrls) {
  for (let index = 0; index < imgUrls.length; index++) {
    const imgUrl = imgUrls[index];
    // 处理图片 URL，确保它是一个完整的 URL
    const fullUrl = imgUrl.startsWith("http") ? imgUrl : "http:" + imgUrl;
    const fileName = path.basename(fullUrl);
    const filePath = path.resolve(__dirname, "downloaded_images", fileName);

    // 创建保存图片的目录
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    try {
      // 使用 axios 下载图片
      const response = await axios({
        method: "get",
        url: fullUrl,
        responseType: "arraybuffer", // 使用 arraybuffer 获取二进制数据
      });
      // 保存为文件
      fs.writeFileSync(filePath, response.data);
      console.log(`图片 ${index + 1} 下载完成: ${fileName}`);

      // 插入图片信息到数据库
      insertImageToDB(fullUrl, fileName, filePath);
    } catch (error) {
      console.error(`图片 ${index + 1} 下载失败: ${error.message}`);
    }
  }
}

// 将图片信息插入到 MySQL 数据库
function insertImageToDB(url, fileName, filePath) {
  const query =
    "INSERT INTO images (url, file_name, file_path) VALUES (?, ?, ?)";
  connection.execute(query, [url, fileName, filePath], (err, results) => {
    if (err) {
      console.error("插入数据库失败:", err);
    } else {
      console.log("图片信息插入数据库成功:", results);
    }
  });
}

// 调用函数，替换为目标网址
fetchImages("https://hesign.com/library/tag:poster"); // 这里填入你想爬取的网址
