package controllers

import (
	"net/http"

	"github.com/study/services"

	"github.com/gin-gonic/gin"
)

type TopicController struct {
	service *services.TopicService
}

func NewTopicController(service *services.TopicService) *TopicController {
	return &TopicController{service: service}
}

func (c *TopicController) GetTopics(ctx *gin.Context) {
	topics, err := c.service.GetTopics()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, topics)
}

func (c *TopicController) GetTopicByID(ctx *gin.Context) {
	code := ctx.Param("code")

	topic, err := c.service.GetTopicByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, topic)
}
