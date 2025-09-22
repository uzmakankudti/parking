import Owner from "../schemas/ownerSchema.js";
import asyncHandler from "express-async-handler";

export const createOwner = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, licence, user, vehicle } = req.body;
        if (!firstName, !licence, !user, !vehicle) {
            return res.status(400).json({
                success: false,
                message: "bad requiest all feilds are rquired"
            });
        } const existingOwner = await Owner.findOne({
            $or: [{ licence }, { vehicle }]
        });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "bad requiest Owner exists with $licence or $vehicle"
            });
        } const addOwner = await Owner.create({
            firstName,
            lastName,
            licence,
            user,
            vehicle
        });
        return res.status(201).json({
            success: true,
            message: "Owner created successfully",
            addOwner
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }
});

export const updateOwner = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, user } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "bad requiest id required"
            });
        }
        // Only pick allowed fields
        const updateOwners = await Owner.findByIdAndUpdate(id, { firstName, lastName, user }, { new: true });
        if (!updateOwners) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Owner updated successfully",
            data: updateOwners
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }
});

export const deleteOwner = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "bad requiest id required"//not working
            });
        } const owner = await Owner.findByIdAndDelete(id);
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: "bad requiest owner not found"
            });
        } return res.status(200).json({
            success: true,
            message: "Owner deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
});

export const getAll = asyncHandler(async (req, res) => {

    const owner = await Owner.find({});
    return res.status(200).json({
        success: true,
        message: "all users",
        owner
    });
});

export const getById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "bad requiest id required"
            });
        } const owner = await Owner.findById( id );
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: `no owner with Id:${id}`
            });
        } return res.status(200).json({
            success: true,
            message: "owner with id",
            data:owner
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
});

export const getByName = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required"
      });
    }

    // search in both firstName and lastName
    const owners = await Owner.find({
      $or: [{ firstName: name }, { lastName: name }]
    });

    if (owners.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No owner found with name: ${name}`
      });
    }

    return res.status(200).json({
      success: true,
      data: owners
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});
