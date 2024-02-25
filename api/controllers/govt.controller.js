import Govt from '../models/govt.model.js';

export const createScheme = async (req, res) => {
  try {
    const { title, Logo, description, eligibility, benefits, process, applyMethod, applyDeadline, applyLink } = req.body;

    if (!title || !eligibility || !description || !applyLink || !benefits || !process) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const newGovt = new Govt({ title, Logo, description, eligibility,benefits, process, applyMethod, applyDeadline, applyLink });

    const savedGovt = await newGovt.save();
    res.status(201).json(savedGovt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getScheme = async (req, res) => {
  try {
    const Govts = await Govt.find();
    res.status(200).json(Govts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const GovtId = await Govt.findById(req.params.id);
    if (!GovtId) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(GovtId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


