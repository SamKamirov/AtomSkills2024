package controllers

import (
	"net/http"

	"github.com/study/services"

	"github.com/gin-gonic/gin"
)

type TraitController struct {
	service *services.TraitService
}

func NewTraitController(service *services.TraitService) *TraitController {
	return &TraitController{service: service}
}

func (c *TraitController) GetTraits(ctx *gin.Context) {
	traits, err := c.service.GetTraits()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, traits)
}

func (c *TraitController) GetTraitByID(ctx *gin.Context) {
	code := ctx.Param("code")

	trait, err := c.service.GetTraitByID(code)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, trait)
}
