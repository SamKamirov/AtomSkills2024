package models

import "go.mongodb.org/mongo-driver/bson/primitive"

const (
	RoleViewOnly       = "view_only"
	RoleViewAndEdit    = "view_and_edit"
	RoleFullPermission = "full_permission"
	RoleAdmin          = "admin"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Username string             `bson:"username" json:"username"`
	Password string             `bson:"password" json:"password"`
	Role     string             `bson:"role" json:"role"`
}
