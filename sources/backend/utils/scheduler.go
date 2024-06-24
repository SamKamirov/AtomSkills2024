package utils

import (
	"context"
	"fmt"
	"time"
	"github.com/study/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CloseTaskAfterTime(coll *mongo.Collection, waitingTime time.Duration, task_code string) {

	go pullToQueue(coll, waitingTime, task_code)
}

func pullToQueue(coll *mongo.Collection, waitingTime time.Duration, task_code string) {
	time.Sleep(waitingTime)
	expireIfIsNotSended(coll, task_code)
	
}

func expireIfIsNotSended(coll *mongo.Collection, task_code string) {
	filter := bson.D{{Key: "tasks", 
							Value: bson.D{{Key: "$elemMatch", 
								Value: bson.D{
								{Key: "code", Value: task_code},
								{Key: "mark", Value: 0}}}}}}

	cur, err := coll.Find(context.Background(), filter)
	var tasks []models.StudentTasks
	if err != nil {
		panic(err)
	}
	defer cur.Close(context.Background())
	if err = cur.All(context.Background(), &tasks); err != nil {
		panic(err)
	}

	
	var newTasks []models.Tasks


	for _, tsk := range tasks[0].Tasks {
		mark := tsk.Mark
		status := tsk.Status
		if tsk.Code == task_code {
			mark = 2
			status = "Проверенно"
		}

		newTasks = append(newTasks, models.Tasks{
			Code: tsk.Code,
			Status: status,
			Mark: mark,
			Comment: tsk.Comment,
			Supplement: tsk.Supplement,
		})
		
	}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "tasks", Value: newTasks}}}}
	
	coll.UpdateOne(context.Background(), filter, update)
	fmt.Printf("%v\n", tasks)
}