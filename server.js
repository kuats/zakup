const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/kapt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(express.json());

// Конфигурация multer для сохранения загруженных файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const tableSchema = new mongoose.Schema({
  department: { type: String, default: '' },
  gpz: { type: String, default: '' },
  truType: { type: String, default: '' },
  purchaseName: { type: String, default: '' },
  purchaseStatus: { type: String, default: '' },
  price: { type: Number, default: 0 },
  contract: { type: String, default: '' },
  modifiedBy: { type: String, default: '' },
  modifiedDate: { type: Date, default: null },
  pdf: {
    name: { type: String, default: '' },
    path: { type: String, default: '' }
  }
});

const TableItem = mongoose.model('TableItem', tableSchema);

// API для получения данных таблицы
app.get('/api/table', (req, res) => {
  TableItem.find({})
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// API для создания новых данных в таблице
app.post('/api/table', (req, res) => {
  const uploadPdf = upload.single('pdf');

  uploadPdf(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // Ошибка при загрузке файла
      console.error(err);
      res.status(500).json({ error: 'Error uploading file' });
    } else if (err) {
      // Другая ошибка
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Загрузка файла прошла успешно или файл не был предоставлен
      const { department, gpz, truType, purchaseName, purchaseStatus, price, contract, modifiedBy, modifiedDate } = req.body;
      const newItem = new TableItem({
        department: department || '',
        gpz: gpz || '',
        truType: truType || '',
        purchaseName: purchaseName || '',
        purchaseStatus: purchaseStatus || '',
        price: price || 0,
        contract: contract || '',
        modifiedBy: modifiedBy || '',
        modifiedDate: modifiedDate || '',
        pdf: {
          name: req.file ? req.file.originalname : '',
          path: req.file ? req.file.path : ''
        }
      });

      newItem.save()
        .then(item => {
          res.status(201).json(item);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        });
    }
  });
});

// API для обновления существующих данных в таблице
app.put('/api/table/:id', (req, res) => {
  const uploadPdf = upload.single('pdf');
  
  uploadPdf(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // Ошибка при загрузке файла
      console.error(err);
      res.status(500).json({ error: 'Error uploading file' });
    } else if (err) {
      // Другая ошибка
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Загрузка файла прошла успешно или файл не был предоставлен
      const { id } = req.params;
      const { department, gpz, truType, purchaseName, purchaseStatus, price, contract, modifiedBy, modifiedDate } = req.body;
      const updatedItem = {
        department: department || '',
        gpz: gpz || '',
        truType: truType || '',
        purchaseName: purchaseName || '',
        purchaseStatus: purchaseStatus || '',
        price: price || 0,
        contract: contract || '',
        modifiedBy: modifiedBy || '',
        modifiedDate: modifiedDate || ''
      };

      if (req.file) {
        updatedItem.pdf = {
          name: req.file.originalname,
          path: req.file.path
        };
      }

      TableItem.findByIdAndUpdate(id, updatedItem, { new: true })
        .then(item => {
          if (req.file && item.pdf && fs.existsSync(item.pdf.path)) {
            fs.unlinkSync(item.pdf.path); // Удаляем предыдущий файл PDF
          }
          res.json(item);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        });
    }
  });
});

// API для удаления строки
app.delete('/api/table/:id', (req, res) => {
  const { id } = req.params;

  TableItem.findByIdAndDelete(id)
    .then(item => {
      if (item && item.pdf && fs.existsSync(item.pdf.path)) {
        fs.unlinkSync(item.pdf.path); // Удаляем файл PDF
      }
      res.json({ message: 'Item deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// API для скачивания PDF файла
app.get('/api/table/:id/download', (req, res) => {
  const { id } = req.params;

  TableItem.findById(id)
    .then(item => {
      if (!item || !item.pdf) {
        res.status(404).json({ error: 'PDF file not found' });
      } else {
        const filePath = item.pdf.path;
        res.download(filePath, item.pdf.name, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          }
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
