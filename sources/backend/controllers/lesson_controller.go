package controllers

import (
	"net/http"

	"github.com/study/services"

	"github.com/gin-gonic/gin"
)

type LessonController struct {
	service *services.LessonService
}

func NewLessonController(service *services.LessonService) *LessonController {
	return &LessonController{service: service}
}

func (c *LessonController) GetLessons(ctx *gin.Context) {
	lessons, err := c.service.GetLessons()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, lessons)
}

func (c *LessonController) GetLessonByID(ctx *gin.Context) {
	code := ctx.Param("code")

	lesson, err := c.service.GetLessonByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, lesson)
}
