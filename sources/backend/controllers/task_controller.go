package controllers

import (
	"net/http"

	"github.com/study/services"

	"github.com/gin-gonic/gin"
)

type TaskController struct {
	service *services.TaskService
}

func NewTaskController(service *services.TaskService) *TaskController {
	return &TaskController{service: service}
}

func (c *TaskController) GetTasks(ctx *gin.Context) {
	tasks, err := c.service.GetTasks()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, tasks)
}

func (c *TaskController) GetTaskByID(ctx *gin.Context) {
	code := ctx.Param("code")

	lesson, err := c.service.GetTaskByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, lesson)
}
