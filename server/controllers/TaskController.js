import { selectAllTasks, insertTask, deleteTaskById } from "../models/Task.js"
import { emptyOrRows } from "../helpers/utils.js"
import { ApiError } from "../helpers/ApiError.js"

const getTasks = async (req,res,next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error)
    }
}

const postTask = async(req,res,next) => {
    try {
        if(!req.body.description || req.body.description.length === 0) return next(new ApiError("Invalid description for task",400))
        
        const result = await insertTask(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

const deleteTask = async(req,res,next) => {
    try {
        if (!/^\d+$/.test(req.params.id)) return next(new ApiError("Invalid task ID. ID must be a positive integer",400))
        const id = parseInt(req.params.id)
        const result = await deleteTaskById(id)
        return res.status(200).json({id: id})
    } catch (error) {
        return next(error)
    }
}

export { getTasks, postTask, deleteTask }