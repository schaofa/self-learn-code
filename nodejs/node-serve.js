const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

const cors = require('cors');

console.log(process.env, 'evvvvvv', process.env.NODE_ENV)

// 创建 express 应用
const app = express();
const port = 3000;

// 创建 MySQL 连接
const connection = mysql.createConnection({
  host: "localhost", // MySQL 服务器地址
  user: "root", // 用户名
  password: "root", // 密码
  database: "imgs-pro", // 数据库名称
});

// 允许跨域
app.use(cors());

// 让静态文件可以通过 `/images` 访问
app.use("/all/images", express.static(path.join(__dirname, "downloaded_images")));

// 获取图片信息接口
app.get("/pro-apis/image/:id", (req, res) => {
  const imageId = req.params.id;

  // 从数据库中查询图片信息
  connection.execute(
    "SELECT * FROM images WHERE id = ?",
    [imageId],
    (err, results) => {
      if (err) {
        return res.status(500).send("数据库查询失败");
      }

      if (results.length === 0) {
        return res.status(404).send("图片未找到");
      }

      const image = results[0];
      const filePath = image.file_path;
      console.log(filePath, "filePath");

      // 确保文件存在
      if (fs.existsSync(filePath)) {
        // 返回图片的 URL
        res.json({
          message: "图片获取成功",
          url: `/images/${path.basename(filePath)}`, // 拼接成可访问的 URL
        });
      } else {
        res.status(404).send("文件未找到");
      }
    }
  );
});

// 示例
app.get('/pro-apis/data', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// 获取所有图片信息接口
app.get("/pro-apis/images", (req, res) => {
  // 从数据库中查询所有图片信息
  connection.execute("SELECT * FROM images", (err, results) => {
    if (err) {
      return res.status(500).send("数据库查询失败");
    }

    if (results.length === 0) {
      return res.status(404).send("没有找到任何图片");
    }
    console.log(results, "results");

    // 返回所有图片信息
    const images = results.map((image) => ({
      id: image.id,
      // url: image.url,
      file_name: image.file_name,
      // file_path: image.file_path,
      accessible_url: `http://localhost:${port}/all/images/${path.basename(image.file_path)}`, // 拼接成可访问的 URL
    }));

    res.json({data: images, code: 200});
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器启动成功，访问地址：http://localhost:${port}`);
});
