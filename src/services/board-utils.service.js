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
                
            "color": "#a8a8a8",
                'txt': ''
            },
            {
                
                "color": "#fdab3d",
                'txt': 'Working on it'
            },
            {
                
                "color": "#e44258",
                'txt': 'Stuck'
            },
            {
                
                "color": "#00ca72",
                'txt': 'Done'
            }
        ],
        'priorities': [{
                
            "color": "#a8a8a8",

                'txt': ''
            },
            {
                
                "color": " #90d5ffd9",
                'txt': 'Low'
            },
            {
                
                "color": "#c137c1ba",
                'txt': 'Medium'
            },
            {
                
                "color": "#e44258",
                'txt': 'High'
            }
        ],
        'activities': [],
        'members': [ ],
        'groups': [{
                
                'color': 'rgb(174, 203, 250)',
                'name': 'BackEnd',
                'tasks': [{
                       
                        'txt': 'txt',
                        'members': [
                        ],
                        'dueDate': '',
                        'status': {
                           
                            'color': '#a8a8a8',
                            'txt': ''
                        },
                        'priority': {
                          
                            'color': '#a8a8a8',
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
                            'color': '#a8a8a8',
                            'txt': ''
                        },
                        'priority': {
                            'color': '#a8a8a8',
                            'txt': ''
                        },
                        'posts': []
                    }
                ]
            },
            {
                
                'color': 'rgb(174, 203, 250)',
                'name': 'Frontend',
                'tasks': [{
                  
                    'txt': 'txt',
                    'members': [
                    ],
                    'dueDate': '',
                    'status': {
                       
                        'color': '#a8a8a8',
                        'txt': ''
                    },
                    'priority': {
                       
                        'color': '#a8a8a8',
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
        'color': 'rgb(242, 139, 130)',
        'name': 'New Group',
        'tasks': [{
           
            'txt': 'txt',
            'members': [
            ],
            'dueDate': '',
            'status': {
                
                'color': '#a8a8a8',
                'txt': ''
            },
            'priority': {
                
                'color': '#a8a8a8',
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
                'color': '#a8a8a8',
                'txt': ''
            },
            'priority': {
                'color': '#a8a8a8',
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
                
                'color': '#a8a8a8',
                'txt': ''
            },
            'priority': {
                
                'color': '#a8a8a8',
                'txt': ''
            },
            'posts': []
        }
    
}