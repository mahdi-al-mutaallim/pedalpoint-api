import appError from "@shared/appError";
import catchAsync from "@shared/catchAsync";
import httpStatus from "@shared/httpStatus";
import sendResponse from "@shared/sendResponse";
import { BikesServices } from "./bikes.services";

const createBike = catchAsync(async (req, res) => {
	const bikeData = req.body;
	const result = await BikesServices.createBikeIntoDB(bikeData);
	if (!result) {
		throw new appError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to add bike");
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Bike added successfully",
		data: result,
	});
});

const getBikes = catchAsync(async (_req, res) => {
	const result = await BikesServices.getBikesFromDB();
	if (!result || result.length === 0) {
		throw new appError(httpStatus.NOT_FOUND, "No Bikes found");
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Bikes fetched successfully",
		data: result,
	});
});

const getBikeById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new appError(httpStatus.BAD_REQUEST, "Bike ID is required");
	}
	const result = await BikesServices.getBikeByIdFromDB(id);
	if (!result) {
		throw new appError(httpStatus.NOT_FOUND, "Bike not found");
	}
	sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Bike fetched successfully",
		data: result,
	});
});

export const BikesControllers = {
	createBike,
	getBikes,
	getBikeById,
};
