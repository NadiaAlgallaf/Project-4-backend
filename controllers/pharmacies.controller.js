import Pharmacy from '../models/Pharmacy.js'
import Medicine from '../models/Medicine.js'

// Create Pharmacy
export const createPharmacy = async (req, res) => {
  try {
    req.body.createdBy = req.user._id

    const pharmacy = await Pharmacy.create(req.body)

    res.status(201).json({
      success: true,
      pharmacy
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// GET all Pharmacies + filter Pharmacies
export const getAllPharmacies = async (req, res) => {
  try {
    const { jobCategory, jobType } = req.query

    const filter = {}

    if (jobCategory) {
      filter.jobCategory = jobCategory
    }

    if (jobType) {
      filter.jobType = jobType
    }

    const jobs = await Job.find(filter).populate("createdBy","firstName lastName companyLogo").sort("-createdAt")

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


