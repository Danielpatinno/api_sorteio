const multer = require("multer")
const AWS = require("aws-sdk")
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

//Multer para upload de arquivo
const upload = multer({ dest: 'uploads/' })

// Post Image
const registerImageMais =  (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao verificar as imagens cadastradas.');
    }

    if (data.Contents.length > 0) {
      return res.status(400).send('Já existe uma imagem cadastrada.');
    }

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: fs.createReadStream(file.path)
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao fazer upload do arquivo');
      }
    
      fs.unlinkSync(file.path);
      res.send({
        originalname: file.originalname
      });
    });
  });
};

// Get Image
const getImageMais = (req, res) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
  }

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar a imagem.');
    }

    if (data.Contents.length === 0) {
      return res.status(404).send('Nenhuma imagem encontrada no bucket.');
    }

    const imageKey = data.Contents[0].Key;

    const imageParams = {
      Bucket: bucketName,
      Key: imageKey,
    };

    s3.getObject(imageParams, (err, imageData) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao buscar a imagem.');
      }

      let contentType = 'image/jpeg'; 
      if (imageKey.endsWith('.png')) {
        contentType = 'image/png';
      } else if (imageKey.endsWith('.gif')) {
        contentType = 'image/gif';
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(imageData.Body, 'binary');
    });
  });
}

// Delete Image
const deleteImageMais = (req, res) => {
  const paramsList = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  s3.listObjectsV2(paramsList, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao listar as imagens.');
    }


    if (data.Contents.length !== 1) {
      return res.status(400).send('Não é possível excluir a imagem porque não existe nenhuma ou existem múltiplas imagens.');
    }

    const imageKey = data.Contents[0].Key;

    const paramsDelete = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageKey,
    };

    s3.deleteObject(paramsDelete, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao deletar a imagem.');
      }

      res.send('Imagem deletada com sucesso.');
    });
  });
};

module.exports = {
  registerImageMais,
  upload,
  getImageMais,
  deleteImageMais
}