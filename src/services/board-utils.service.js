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
    creator: {
      _id: '304',
      fullName: 'Muki Ben David',
      imgUrl: 'https://www.img.com/101.png'
    },
    statuses: [
      {
        color: 'gray',
        txt: ''
      },
      {
        color: 'yellow',
        txt: 'Working on it'
      },
      {
        color: 'red',
        txt: 'Stuck'
      },
      {
        color: 'green',
        txt: 'Done'
      }
    ],
    priorities: [
      {
        color: 'gray',
        txt: ''
      },
      {
        color: 'lightblue',
        txt: 'Low'
      },
      {
        color: 'purple',
        txt: 'Medium'
      },
      {
        color: 'red',
        txt: 'High'
      }
    ],
    members: [],
    groups: [
      {
        color: '#000000',
        name: 'BackEnd',
        tasks: [getEmptyTask(),getEmptyTask()]
        
      },
      {
        color: '#000000',
        name: 'Frontend',
        tasks: [getEmptyTask(),getEmptyTask()]
      }
    ]
  }
}

function getEmptyGroup() {
  return {
    color: '#FFFFFF',
    name: 'New Group',
    tasks: [
      {
        txt: 'txt',
        members: [],
        dueDate: '',
        status: {
          color: 'gray',
          txt: ''
        },
        priority: {
          color: 'gray',
          txt: ''
        },
        posts: [],
        activities: []
      },
      {
        txt: 'txt',
        members: [],
        dueDate: '',
        status: {
          color: 'gray',
          txt: ''
        },
        priority: {
          color: 'gray',
          txt: ''
        },
        posts: [],
        activities: []
      }
    ]
  }
}

function getEmptyTask() {
  return {
    txt: 'txt',
    members: [],
    dueDate: '',
    status: {
      color: 'gray',
      txt: ''
    },
    priority: {
      color: 'gray',
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
