const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Test = require('../models/Test');

// Créer un Test
router.post('/', async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lire tous les Tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      // Vérifier si l'ID est valide
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid ID format' });
      }
      // Convertir l'ID en ObjectId et rechercher l'utilisateur
      const test = await Test.findById(id);

      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      if (!test) {
          return res.status(404).json({ message: 'test not found' });
      }
      // Renvoyer l'utilisateur trouvé
      res.json(test);

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  });

// Mettre à jour un Test
router.put('/:id', async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un Test
router.delete('/:id', async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Test supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;