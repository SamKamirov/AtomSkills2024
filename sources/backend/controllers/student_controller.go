package controllers

import (
	"net/http"

	"github.com/study/models"
	"github.com/study/services"
	"github.com/study/utils"

	"github.com/gin-gonic/gin"
)

type StudentController struct {
	service *services.StudentService
}

func NewStudentController(service *services.StudentService) *StudentController {
	return &StudentController{service: service}
}

func (c *StudentController) LoginStudent(ctx *gin.Context) {
	var credentials models.Student
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	student, err := c.service.GetUserByUsername(credentials.Username)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password (student)"})
		return
	}

	if !utils.CheckPasswordHash(credentials.Password, student.Password) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password (student)"})
		return
	}

	token, err := utils.GenerateJWTStudent(student)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token, "username": credentials.Username, "role": "student", "_id": credentials.ID})
}

func (c *StudentController) CreateStudent(ctx *gin.Context) {
	var student models.Student
	if err := ctx.ShouldBindJSON(&student); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	passwordHash, _ := utils.HashPassword(student.Password)
	student.Password = passwordHash
	if err := c.service.CreateStudent(student); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Student created successfully"})
}

func (c *StudentController) GetStudents(ctx *gin.Context) {
	students, err := c.service.GetStudents()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, students)
}

func (c *StudentController) GetStudentByID(ctx *gin.Context) {
	code := ctx.Param("code")

	student, err := c.service.GetStudentByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, student)
}

func (c *StudentController) UpdateStudent(ctx *gin.Context) {
	id := ctx.Param("id")
	var student models.Student
	if err := ctx.ShouldBindJSON(&student); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.service.UpdateStudent(id, student); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Student updated successfully"})
}

func (c *StudentController) DeleteStudent(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteStudent(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}
