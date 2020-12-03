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
        color: '#f6c27f',
        txt: 'Working on it'
      },
      {
        color: '#d2505f',
        txt: 'Stuck'
      },
      {
        color: '#5ac47d',
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
        color: '#c137c1ba',
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
