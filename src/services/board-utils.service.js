export const boardUtils = {
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask
}
function getEmptyBoard(){
    return {
        'name': 'myBoard',
        'creator': {
            '_id': '304',
            'fullName': 'Muki Ben David',
            'imgUrl': 'https://www.img.com/101.png'
        },
        'statuses': [{
                
                'color': 'gray',
                'txt': ''
            },
            {
                
                'color': 'yellow',
                'txt': 'Working on it'
            },
            {
                
                'color': 'red',
                'txt': 'Stuck'
            },
            {
                
                'color': 'green',
                'txt': 'Done'
            }
        ],
        'priorities': [{
                
                'color': 'gray',
                'txt': ''
            },
            {
                
                'color': 'lightblue',
                'txt': 'Low'
            },
            {
                
                'color': 'purple',
                'txt': 'Medium'
            },
            {
                
                'color': 'red',
                'txt': 'High'
            }
        ],
        'activities': [],
        'members': [ ],
        'groups': [{
                
                'color': '#ffffff',
                'name': 'BackEnd',
                'tasks': [{
                       
                        'txt': 'txt',
                        'members': [
                        ],
                        'dueDate': '',
                        'status': {
                           
                            'color': 'gray',
                            'txt': ''
                        },
                        'priority': {
                          
                            'color': 'gray',
                            'txt': ''
                        },
                        'posts': []
                    },
                    {
                        'txt': 'txt',
                        'members': [
                        ],
                        'dueDate': '',
                        'status': {
                            'color': 'gray',
                            'txt': ''
                        },
                        'priority': {
                            'color': 'gray',
                            'txt': ''
                        },
                        'posts': []
                    }
                ]
            },
            {
                
                'color': '#ffffff',
                'name': 'Frontend',
                'tasks': [{
                  
                    'txt': 'txt',
                    'members': [
                    ],
                    'dueDate': '',
                    'status': {
                       
                        'color': 'gray',
                        'txt': ''
                    },
                    'priority': {
                       
                        'color': 'gray',
                        'txt': ''
                    },
                    'posts': []
                }]
            }
        ]
    }
}


function getEmptyGroup() {
    return {
        'color': '#FFFFFF',
        'name': 'New Group',
        'tasks': [{
           
            'txt': 'txt',
            'members': [
            ],
            'dueDate': '',
            'status': {
                
                'color': 'gray',
                'txt': ''
            },
            'priority': {
                
                'color': 'gray',
                'txt': ''
            },
            'posts': []
        },
        {
          
            'txt': 'txt',
            'members': [
            ],
            'dueDate': '',
            'status': {
                'color': 'gray',
                'txt': ''
            },
            'priority': {
                'color': 'gray',
                'txt': ''
            },
            'posts': []
        }
        ]
    }
}

function getEmptyTask(){
    return {
            'txt': 'txt',
            'members': [
            ],
            'dueDate': '',
            'status': {
                
                'color': 'gray',
                'txt': ''
            },
            'priority': {
                
                'color': 'gray',
                'txt': ''
            },
            'posts': []
        }
    
}