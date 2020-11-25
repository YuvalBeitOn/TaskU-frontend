import { httpService } from './http.service';

export const boardService = {
  query,
  getById,
  remove,
  save,
  getEmptyBoard
};

function query() {
  return httpService.get('board');
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`);
}

function remove(boardId) {
  return httpService.delete(`board/${boardId}`);
}

function save(board) {
  const savedBoard = board._id ? _update(board) : _add(board);
  return savedBoard;
}

async function _add(board) {
  return httpService.post(`board/`, board);
}

async function _update(board) {
  return httpService.put(`board/${board._id}`, board);
}

function getEmptyBoard(){
 return {
    'name': 'myBoard',
    'creator': {
        '_id': '304',
        'fullname': 'Nuki Ben David',
        'imgUrl': 'https://www.img.com/101.png'
    },
    'statuses': [{
            'id': '801',
            'color': 'gray',
            'txt': ''
        },
        {
            'id': '803',
            'color': 'yellow',
            'txt': 'Working on it'
        },
        {
            'id': '804',
            'color': 'red',
            'txt': 'Stuck'
        },
        {
            'id': '805',
            'color': 'green',
            'txt': 'Done'
        }
    ],
    'priorities': [{
            'id': '704',
            'color': 'gray',
            'txt': ''
        },
        {
            'id': '701',
            'color': 'lightblue',
            'txt': 'Low'
        },
        {
            'id': '702',
            'color': 'purple',
            'txt': 'Medium'
        },
        {
            'id': '703',
            'color': 'red',
            'txt': 'High'
        }
    ],
    'activities': [],
    'members': [ ],
    'groups': [{
            'id': '401',
            'color': '#ffffff',
            'name': 'BackEnd',
            'tasks': [{
                    'id': '840',
                    'txt': 'txt',
                    'members': [
                    ],
                    'dueDate': '',
                    'status': {
                        'id': '801',
                        'color': 'gray',
                        'txt': ''
                    },
                    'priority': {
                        'id': '704',
                        'color': 'gray',
                        'txt': ''
                    },
                    'posts': []
                },
                {
                    'id': '842',
                    'txt': 'txt',
                    'members': [
                    ],
                    'dueDate': '',
                    'status': {
                        'id': '801',
                        'color': 'gray',
                        'txt': ''
                    },
                    'priority': {
                        'id': '704',
                        'color': 'gray',
                        'txt': ''
                    },
                    'posts': []
                }
            ]
        },
        {
            'id': '402',
            'color': '#ffffff',
            'name': 'Frontend',
            'tasks': [{
                'id': '920',
                'txt': 'txt',
                'members': [
                ],
                'dueDate': '',
                'status': {
                    'id': '801',
                    'color': 'gray',
                    'txt': ''
                },
                'priority': {
                    'id': '704',
                    'color': 'gray',
                    'txt': ''
                },
                'posts': []
            }]
        }
    ]
}
}