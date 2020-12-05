export const boardUtils = {
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyPost,
  getEmptyActivity
}
function getEmptyBoard() {
  return {
    name: 'New Team-Board',
    description: 'Write your description!',
    statuses: [
      {
        color: '#c4c4c4',
        txt: ''
      },
      {
        color: 'rgb(253, 171, 61)',
        txt: 'Working on it'
      },
      {
        color: 'rgb(226, 68, 92)',
        txt: 'Stuck'
      },
      {
        color: 'rgb(0, 200, 117)',
        txt: 'Done'
      }
    ],
    priorities: [
      {
        color: '#a8a8a8',
        txt: ''
      },
      {
        color: ' #90d5ffd9',
        txt: 'Low'
      },
      {
        color: 'rgb(162, 93, 220)',
        txt: 'Medium'
      },
      {
        color: '#e44258',
        txt: 'High'
      }
    ],
    activities: [],
    members: [],
    groups: [getEmptyGroup(), getEmptyGroup()]
  }
}

function getEmptyGroup() {
  return {
    color: 'rgb(0, 134, 192)',
    name: 'New Group',
    tasks: [getEmptyTask(), getEmptyTask()]
  }
}

function getEmptyTask() {
  return {
    txt: 'txt',
    members: [],
    dueDate: '',
    status: {
      color: '#c4c4c4',
      txt: ''
    },
    priority: {
      color: '#c4c4c4',
      txt: ''
    },
    posts: [],
  }
}

function getEmptyPost() {
  return {
    id: null,
    txt: 'txt',
    createdAt: '',
    byUser: null
  }
}

function getEmptyActivity() {
  return {
    id: null,
    txt: 'txt',
    createdAt: null,
    byUser: null
  }
}
