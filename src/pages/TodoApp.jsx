import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index, newName) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(index)}
                  />
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => editTask(index, e.target.value)}
                    className="border-none bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => deleteTask(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <p>{tasks.length} tasks</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoApp;