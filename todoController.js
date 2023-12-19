import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import * as todoService from "./todoService.js"

const eta = new Eta({ views: `${Deno.cwd()}/templates/` })

const showForm = async(c) => {
    const data = {
        todos: await todoService.listTodos()
    }

    return c.html(eta.render("todos.eta", data))
}

const createTodo = async(c) => {
    const body = await c.req.parseBody()
    await todoService.addTodo(body)
    return c.redirect("/todos")
}

const showTodo = async(c) => {
    const id = c.req.param("id")
    const data = {
        todo: await todoService.getTodo(id)
    }
    return c.html(eta.render("todo.eta", data))
}

const updateTodo = async(c) => {
    const id = c.req.param("id")
    const body = await c.req.parseBody()
    await todoService.updateTodo(id, body)
    return c.redirect(`/todos/${id}`)
}

const deleteTodo = async(c) => {
    const id = c.req.param("id")
    await todoService.deleteTodo(id)
    return c.redirect("/todos")
}

export { showForm, createTodo, showTodo, updateTodo, deleteTodo }