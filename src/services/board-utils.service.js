export const boardUtils = {
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyPost,
  getEmptyActivity
}
function getEmptyBoard() {
  return {
    name: 'myBoard',
    description:'myBoard is the Best',
    creator: {
      _id: '304',
      fullName: 'Muki Ben David',
      imgUrl: 'https://www.img.com/101.png'
    },
    statuses: [
      {
        color: '#a8a8a8',
        txt: ''
      },
      {
        color: '#fdab3d',
        txt: 'Working on it'
      },
      {
        color: '#e44258',
        txt: 'Stuck'
      },
      {
        color: '#00ca72',
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
    activities:[]
    ,
    members: [],
    groups: [getEmptyGroup(), getEmptyGroup()]
  }
}

function getEmptyGroup() {
  return {
    color: 'rgb(174, 203, 250)',
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
      color: '#a8a8a8',
      txt: ''
    },
    priority: {
      color: '#a8a8a8',
      txt: ''
    },
    posts: [],
    activities: []
  }
}

function getEmptyPost() {
  return {
    id: null,
    txt: 'txt',
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
