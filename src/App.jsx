import React from "react"
import axios from "axios"

import Login from "./components/LoginForm"
import Register from "./components/RegisterForm"
import Header from "./components/Header"
import Folders from "./components/Folders"
import Tasks from "./components/Tasks"
import AddFolderForm from "./components/AddFolderForm"
import AddTaskForm from "./components/AddTaskForm"
import OpenButton from "./components/OpenButton"
import Footer from "./components/Footer"
import UserProfile from "./components/UserProfile"
import InFolderTasks from "./components/InFolderTasks"
import DeleteTaskForm from "./components/DeleteTaskForm"

const addFolderUrl = `http://localhost/todo-backend/add_folder.php`
const renameFolderUrl = `http://localhost/todo-backend/rename_folder.php`
const deleteFolderUrl = `http://localhost/todo-backend/delete_folder.php`

const addTaskUrl = `http://localhost/todo-backend/add_task.php`

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: "folders", // folders, tasks, profile, inFolder

            theme: "dark",

            user: [],

            folders: [],
            folder_id: null,

            tasks: [],
            selectedTasks: [],

            error: null,

            loggedInUser: null,
            authPage: "login"
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.toggleAuthPage = this.toggleAuthPage.bind(this)
        this.logout = this.logout.bind(this)

        this.changePage = this.changePage.bind(this)
        this.changeTheme = this.changeTheme.bind(this)

        this.loadFolders = this.loadFolders.bind(this)
        this.addFolder = this.addFolder.bind(this)
        this.renameFolder = this.renameFolder.bind(this)
        this.deleteFolder = this.deleteFolder.bind(this)

        this.getFolderId = this.getFolderId.bind(this)

        this.loadTasks = this.loadTasks.bind(this)
        this.loadFolderTasks = this.loadFolderTasks.bind(this)
        this.addTask = this.addTask.bind(this)
        this.toggleTaskSelection = this.toggleTaskSelection.bind(this)
        this.deleteTasks = this.deleteTasks.bind(this)
    }

    componentDidMount() {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            this.setState({ theme: savedTheme }, this.applyTheme)
        } else {
            this.setState({ theme: "dark" }, this.applyTheme)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            this.applyTheme()
            localStorage.setItem('theme', this.state.theme)
        }
    }

    applyTheme() {
        const wrapper = document.getElementById("wrapper")

        if (this.state.theme === "light") {
            wrapper.classList.add("light")
            wrapper.classList.remove("dark")
        } else {
            wrapper.classList.add("dark")
            wrapper.classList.remove("light")
        }
    }

    handleLogin(user) {
        this.setState({
            loggedInUser: user,
            authPage: null
        }, () => {
            this.loadAppData(user)
        })
    }

    toggleAuthPage() {
        this.setState({
            authPage: this.state.authPage === "login" ? "register" : "login"
        })
    }

    logout() {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            this.setState({ theme: savedTheme }, this.applyTheme)
        } else {
            this.setState({ theme: "dark" }, this.applyTheme)
        }

        this.setState({
            page: "folders",

            user: [],

            folders: [],
            folder_id: null,

            tasks: [],
            selectedTasks: [],

            error: null,

            loggedInUser: null,
            authPage: "login"
        })
    }


    loadAppData(user) {
        if (!user) {
            console.warn("Користувач не знайдений!")

            return
        }

        this.loadFolders(user.user_id)

        axios.get(`http://localhost/todo-backend/users.php?user_id=${user.user_id}`).then((res) => {
            this.setState({ user: res.data })
        }).catch(error => {
            console.error("Error fetching user:", error)
            this.setState({ error: "Помилка при отриманні користувача" })
        })
    }

    loadFolders(user_id) {
        if (!user_id) {
            console.warn("user_id відсутній при завантаженні папок!")

            return
        }

        axios.get(`http://localhost/todo-backend/folders.php?user_id=${user_id}`).then(response => {
            this.setState({ folders: response.data })
        }).catch(error => {
            console.error('Error loading folders:', error)
        })
    }

    getFolderId(folder_id) {
        this.setState({
            folder_id: folder_id
        })
    }

    addFolder(folder) {
        const { loggedInUser } = this.state

        if (!loggedInUser) {
            console.warn("Користувач не увійшов при додаванні папки!")

            return
        }

        axios.post(addFolderUrl, {
            user_id: loggedInUser.user_id,
            folder_title: folder.folder_title
        }).then((res) => {
            console.log('Folder added:', res.data)

            this.loadFolders(loggedInUser.user_id)
        }).catch(error => {
            console.error('Error adding folder:', error)
        })
    }

    renameFolder(folder_id, folder_title) {
        axios.post(renameFolderUrl, {
            folder_id: folder_id,
            folder_title: folder_title
        }).then((res) => {
            console.log('Folder renamed:', res.data)

            const { loggedInUser } = this.state

            if (loggedInUser) {
                this.loadFolders(loggedInUser.user_id)
            }
        }).catch(error => {
            console.error('Error renaming folder:', error)
        })
    }

    deleteFolder(folder_id) {
        axios.post(deleteFolderUrl, {
            folder_id: folder_id
        }).then((res) => {
            console.log('Folder deleted:', res.data)

            const { loggedInUser } = this.state

            if (loggedInUser) {
                this.loadFolders(loggedInUser.user_id)
            }
        }).catch(error => {
            console.error('Error deleting folder:', error)
        })
    }

    loadTasks(user_id) {
        const { loggedInUser } = this.state

        if (!user_id) {
            console.warn("Користувач не увійшов при завантаженні завдань!")
            return
        }

        let taskUrl = `http://localhost/todo-backend/tasks.php?user_id=${loggedInUser.user_id}`

        axios.get(taskUrl).then((res) => {
            this.setState({ tasks: res.data })
        }).catch(error => {
            console.error("Error fetching tasks:", error)
        })
    }

    loadFolderTasks(user_id, folder_id = null) {
        const { loggedInUser } = this.state

        if (!user_id) {
            console.warn("Користувач не увійшов при завантаженні завдань!")
            return
        }

        const folderToLoad = folder_id !== null ? folder_id : this.state.folder_id

        let taskUrl = `http://localhost/todo-backend/tasks.php?user_id=${loggedInUser.user_id}&folder_id=${folderToLoad}`

        axios.get(taskUrl).then((res) => {
            this.setState({ tasks: res.data })
        }).catch(error => {
            console.error("Error fetching tasks:", error)
        })
    }

    addTask(task) {
        const { loggedInUser, folder_id } = this.state

        if (!loggedInUser) {
            console.warn("Користувач не увійшов при додаванні завдання!")
            return
        }

        axios.post(addTaskUrl, {
            user_id: loggedInUser.user_id,
            folder_id: folder_id,
            task_title: task.task_title,
            task_content: task.task_content,
            priority: task.priority
        }).then((res) => {
            console.log('Task added:', res.data)

            this.loadFolderTasks(loggedInUser.user_id, folder_id)
        }).catch(error => {
            console.error('Error adding task:', error)
        })
    }

    toggleTaskSelection(task_id) {
        const { selectedTasks } = this.state

        if (selectedTasks.includes(task_id)) {
            this.setState({
                selectedTasks: selectedTasks.filter(id => id !== task_id)
            })
        } else {
            this.setState({
                selectedTasks: [...selectedTasks, task_id]
            })
        }
    }

    deleteTasks() {
        const { selectedTasks, loggedInUser, folder_id } = this.state

        if (selectedTasks.length === 0) {
            alert("Select at least one task to delete!")

            return
        }

        axios.post('http://localhost/todo-backend/delete_tasks.php', {
            task_ids: selectedTasks
        }).then(res => {
            console.log(res.data)

            if (folder_id) {
                this.loadFolderTasks(loggedInUser.user_id, folder_id)
            } else {
                this.loadTasks(loggedInUser.user_id)
            }

            this.setState({
                selectedTasks: []
            })
        }).catch(error => {
            console.error("Error deleting tasks:", error)
        })
    }

    changeTheme(theme) {
        this.setState({
            theme: theme
        })
    }

    changePage(page) {
        this.setState({
            page: page
        })
    }

    loadPage() {
        if (this.state.page === "folders") {
            return (
                <Folders userId={this.state.loggedInUser} loadFolderTasks={this.loadFolderTasks} getFolderId={this.getFolderId} onPageChange={this.changePage} folders={this.state.folders} onRename={this.renameFolder} onDelete={this.deleteFolder} />
            )
        } else if (this.state.page === "tasks") {
            return (
                <Tasks folders={this.state.folders} tasks={this.state.tasks} toggleTaskSelection={this.toggleTaskSelection} selectedTasks={this.state.selectedTasks} />
            )
        } else if (this.state.page === "profile") {
            return (
                <UserProfile onChangeTheme={this.changeTheme} theme={this.state.theme} user={this.state.user} onLogout={this.logout} />
            )
        } else if (this.state.page === "inFolder") {
            return (
                <InFolderTasks key={this.state.folder_id} onPageChange={this.changePage} folder={this.state.folders} folderId={this.state.folder_id} tasks={this.state.tasks} toggleTaskSelection={this.toggleTaskSelection} selectedTasks={this.state.selectedTasks} />
            )
        }
    }

    loadSidebar() {
        const { page, loggedInUser } = this.state

        if (!loggedInUser) return null

        if (page === "folders") {
            return (
                <aside className="folders-sidebar">
                    <OpenButton />

                    <AddFolderForm userId={loggedInUser.user_id} onFolderAdd={this.addFolder} />
                </aside>
            )
        } else if (page === "tasks") {
            return (
                <aside className="tasks-sidebar">
                    <OpenButton />

                    <DeleteTaskForm deleteTasks={this.deleteTasks} />
                </aside>
            )

        } else if (page === "inFolder") {
            return (
                <aside className="in-folder-sidebar">
                    <OpenButton />

                    <AddTaskForm userId={loggedInUser.user_id} folderId={this.state.folder_id} onTaskAdd={this.addTask} />

                    <DeleteTaskForm deleteTasks={this.deleteTasks} />
                </aside>
            )
        } else if (page === "user") {
            return null
        }
    }

    render() {
        const { loggedInUser, authPage, page, user } = this.state

        if (!loggedInUser) {
            return (
                <div className="login-and-register">
                    <div className="shape">
                        {authPage === "login" ? (
                            <Login isMessage={this.state.message} showMessage={this.showMessage} onLogin={this.handleLogin} onChangePage={this.toggleAuthPage} />
                        ) : (
                            <Register onLogin={this.handleLogin} onChangePage={this.toggleAuthPage} />
                        )}
                    </div>
                </div>
            )
        }

        return (
            <>
                <Header loadTasks={this.loadTasks} userId={this.state.loggedInUser} page={page} onPageChange={this.changePage} user={user} />

                <div className="main-wrapper">
                    <main>
                        <div className="container">
                            {this.loadPage()}
                        </div>
                    </main>

                    {this.loadSidebar()}
                </div>

                <Footer />
            </>
        )
    }
}

export default App
