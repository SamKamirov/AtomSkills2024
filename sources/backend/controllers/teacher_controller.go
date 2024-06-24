package controllers

import (
	"net/http"

	"github.com/study/models"
	"github.com/study/services"
	"github.com/study/utils"

	"github.com/gin-gonic/gin"
)

type TeacherController struct {
	service *services.TeacherService
}

func NewTeacherController(service *services.TeacherService) *TeacherController {
	return &TeacherController{service: service}
}

func (c *TeacherController) LoginTeacher(ctx *gin.Context) {
	var credentials models.Teacher
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	teacher, err := c.service.GetUserByUsername(credentials.Username)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password (teacher)"})
		return
	}

	if !utils.CheckPasswordHash(credentials.Password, teacher.Password) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password (teacher)"})
		return
	}

	token, err := utils.GenerateJWTTeacher(teacher)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token, "username": credentials.Username, "role": "teacher", "_id": credentials.ID})
}

func (c *TeacherController) CreateTeacher(ctx *gin.Context) {
	var teacher models.Teacher
	if err := ctx.ShouldBindJSON(&teacher); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	passwordHash, _ := utils.HashPassword(teacher.Password)
	teacher.Password = passwordHash
	if err := c.service.CreateTeacher(teacher); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Teacher created successfully"})
}

func (c *TeacherController) GetTeachers(ctx *gin.Context) {
	teachers, err := c.service.GetTeachers()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, teachers)
}

func (c *TeacherController) GetTeacherByID(ctx *gin.Context) {
	code := ctx.Param("code")

	teacher, err := c.service.GetTeacherByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, teacher)
}

func (c *TeacherController) UpdateTeacher(ctx *gin.Context) {
	id := ctx.Param("id")
	var teacher models.Teacher
	if err := ctx.ShouldBindJSON(&teacher); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.service.UpdateTeacher(id, teacher); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Teacher updated successfully"})
}

func (c *TeacherController) DeleteTeacher(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteTeacher(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Teacher deleted successfully"})
}
