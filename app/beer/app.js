{
    "recipes": [
        {
            "name": "Recipe 1",
            "runTime": "01:00:00",
            "active": true,
            "steps": [
                {
                    "id": 1,
                    "name": "Step 1",
                    "desc": "Fill HLT with XXX gallons and heat to XXX F",
                    "partial": "partials/step1.js",
                    "targetTemp": 165,
                    "targetVolume": 15,
                    "targetTime": 0,
                    "components": {
                        "vessels": [
                            "HLT"
                        ],
                        "pumps": [
                            
                        ],
                        "valves": [
                            1,
                            2
                        ],
                        "heaters": [
                            1
                        ],
                        "plumping": [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    "active": true,
                    "status": "running"
                },
                {
                    "id": 2,
                    "name": "Step 2",
                    "desc": "Add XXX gallons to MLT",
                    "partial": "partials/step2.js",
                    "targetTemp": 0,
                    "targetVolume": 1.5,
                    "targetTime": 0,
                    "components": {
                        "vessels": [
                            "HLT",
                            "MLT"
                        ],
                        "pumps": [
                            1
                        ],
                        "valves": [
                            2,
                            3
                        ],
                        "heaters": [
                            
                        ],
                        "plumping": [
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "status": "clean"
                }
            ]
        }
    ],
    "setup": {
        "vessels": [
            {
                "name": "HLT",
                "img": "img/vessels/hlt-20g.png",
                "boil_off": 1.5,
                "herms": true,
                "heat_input": {
                    "id": 1
                },
                "position": {
                    "top": 1,
                    "left": 1
                },
                "volume": {
                    "currentVolume": 8.8,
                    "maxVolume": 20,
                    "deadSpace": 0,
                    "liquidLevel": {
                        "max": [
                            {
                                "x": 4,
                                "y": 20
                            },
                            {
                                "x": 182,
                                "y": 20
                            }
                        ],
                        "min": [
                            {
                                "x": 4,
                                "y": 212
                            },
                            {
                                "x": 182,
                                "y": 212
                            }
                        ]
                    }
                }
            },
            {
                "name": "MLT",
                "img": "img/vessels/mlt-15g.png",
                "boilOff": 1.25,
                "fired": false,
                "position": {
                    "left": 310,
                    "top": 1
                },
                "volume": {
                    "currentVolume": 0,
                    "maxVolume": 15,
                    "deadSpace": 1.5
                }
            },
            {
                "name": "BK",
                "img": "img/vessels/bk-15g.png",
                "boilOff": 1.25,
                "fired": true,
                "heatInput": {
                    "id": 2
                },
                "position": {
                    "left": 575,
                    "top": 1
                },
                "volume": {
                    "currentVolume": 0,
                    "maxVolume": 15,
                    "deadSpace": 0.5
                }
            }
        ],
        "pumps": [
            {
                "name": "pump 1",
                "img": "img/pumps/pump-default.png",
                "desc": "feeds HLT/MLT",
                "dependencies": {
                    "steps": [
                        2,
                        4,
                        5
                    ],
                    "valves": [
                        3
                    ]
                },
                "position": {
                    "left": 266,
                    "top": 249
                }
            },
            {
                "name": "pump 2",
                "img": "img/pumps/pump-default.png",
                "desc": "feeds BK",
                "dependencies": {
                    "steps": [
                        5
                    ],
                    "valves": [
                        4
                    ]
                },
                "position": {
                    "left": 530,
                    "top": 249
                }
            }
        ],
        "valves": [
            {
                "name": "valve 1",
                "type": 2,
                "img": "img/valves/auto-valve-2-way.png",
                "desc": "control input into system",
                "manual": false,
                "position": {
                    "left": 155,
                    "top": 303
                }
            },
            {
                "name": "valve 2",
                "type": 3,
                "img": "img/valves/auto-valve-3-way.png",
                "desc": "control input to HLT/Valve 3",
                "manual": false,
                "position": {
                    "left": 91,
                    "top": 273
                }
            },
            {
                "name": "valve 3",
                "type": 3,
                "img": "img/valves/auto-valve-3-way.png",
                "desc": "control input into pump1",
                "manual": false,
                "position": {
                    "left": 332,
                    "top": 287
                }
            },
            {
                "name": "valve 4",
                "type": 2,
                "img": "img/valves/auto-valve-2-way.png",
                "desc": "control input into pump2",
                "manual": false,
                "position": {
                    "left": 446,
                    "top": 256
                }
            },
            {
                "name": "valve 5",
                "type": 2,
                "img": "img/valves/manual-valve-2-way.png",
                "desc": "control output from system",
                "manual": true,
                "position": {
                    "left": 646,
                    "top": 351
                }
            },
            {
                "name": "valve 6",
                "type": 2,
                "img": "img/valves/manual-valve-2-way.png",
                "desc": "control output from system/HLT",
                "manual": true,
                "position": {
                    "left": 81,
                    "top": 312
                }
            }
        ],
        "heaters": [
            {
                "id": 1,
                "name": "burner 1",
                "desc": "heats HLT and MLT via HERMS",
                "img": "img/heaters/heater-default.png",
                "state": "on",
                "position": {
                    "left": 59,
                    "top": 248
                }
            },
            {
                "id": 2,
                "name": "burner 2",
                "desc": "heats BK directly",
                "img": "img/heaters/heater-default.png",
                "state": "off",
                "position": {
                    "left": 625,
                    "top": 248
                }
            }
        ],
        "coolers": [
            {
                "id": 1,
                "name": "the brick",
                "desc": "plate chiller",
                "img": "img/coolers/plate-chiller.png",
                "state": "off",
                "position": {
                    "left": 614,
                    "top": 278
                }
            }
        ],
        "plumbing": [
            {
                "id": 1,
                "name": "water in",
                "desc": "water into cooler",
                "label": "W In",
                "active": true,
                "points": [
                    {
                        "x": 597,
                        "y": 333
                    },
                    {
                        "x": 614,
                        "y": 333
                    }
                ]
            },
            {
                "id": 2,
                "name": "",
                "desc": "",
                "label": "",
                "active": true,
                "points": [
                    {
                        "x": 614,
                        "y": 290
                    },
                    {
                        "x": 569,
                        "y": 290
                    },
                    {
                        "x": 569,
                        "y": 310
                    },
                    {
                        "x": 198,
                        "y": 310
                    },
                    {
                        "x": 198,
                        "y": 300
                    },
                    {
                        "x": 174,
                        "y": 300
                    }
                ]
            },
            {
                "id": 3,
                "name": "",
                "desc": "",
                "label": "",
                "active": true,
                "points": [
                    {
                        "x": 141,
                        "y": 300
                    },
                    {
                        "x": 95,
                        "y": 300
                    },
                    {
                        "x": 95,
                        "y": 312
                    },
                    {
                        "x": 95,
                        "y": 287
                    }
                ]
            },
            {
                "id": 4,
                "name": "",
                "desc": "",
                "label": "",
                "active": true,
                "points": [
                    {
                        "x": 95,
                        "y": 206
                    },
                    {
                        "x": 95,
                        "y": 254
                    }
                ]
            },
            {
                "id": 5,
                "name": "",
                "desc": "",
                "label": "",
                "points": [
                    {
                        "x": 112,
                        "y": 272
                    },
                    {
                        "x": 218,
                        "y": 272
                    },
                    {
                        "x": 218,
                        "y": 286
                    },
                    {
                        "x": 318,
                        "y": 286
                    }
                ]
            },
            {
                "id": 6,
                "name": "",
                "desc": "",
                "label": "",
                "points": [
                    {
                        "x": 335,
                        "y": 268
                    },
                    {
                        "x": 335,
                        "y": 254
                    },
                    {
                        "x": 298,
                        "y": 254
                    }
                ]
            },
            {
                "id": 7,
                "name": "",
                "desc": "",
                "label": "",
                "points": [
                    {
                        "x": 275,
                        "y": 230
                    },
                    {
                        "x": 275,
                        "y": 190
                    },
                    {
                        "x": 28,
                        "y": 190
                    },
                    {
                        "x": 28,
                        "y": 172
                    },
                    {
                        "x": 162,
                        "y": 172
                    },
                    {
                        "x": 162,
                        "y": 154
                    },
                    {
                        "x": 28,
                        "y": 154
                    },
                    {
                        "x": 28,
                        "y": 136
                    },
                    {
                        "x": 162,
                        "y": 136
                    },
                    {
                        "x": 162,
                        "y": 118
                    },
                    {
                        "x": 28,
                        "y": 118
                    },
                    {
                        "x": 28,
                        "y": 100
                    },
                    {
                        "x": 162,
                        "y": 100
                    },
                    {
                        "x": 162,
                        "y": 82
                    },
                    {
                        "x": 28,
                        "y": 82
                    },
                    {
                        "x": 28,
                        "y": 64
                    },
                    {
                        "x": 310,
                        "y": 64
                    }
                ]
            },
            {
                "id": 8,
                "name": "",
                "desc": "",
                "label": "",
                "points": [
                    {
                        "x": 353,
                        "y": 286
                    },
                    {
                        "x": 393,
                        "y": 286
                    },
                    {
                        "x": 393,
                        "y": 206
                    },
                    {
                        "x": 393,
                        "y": 253
                    },
                    {
                        "x": 432,
                        "y": 253
                    }
                ]
            },
            {
                "id": 9,
                "name": "",
                "desc": "",
                "label": "",
                "points": [
                    {
                        "x": 465,
                        "y": 253
                    },
                    {
                        "x": 518,
                        "y": 253
                    }
                ]
            },
            {
                "id": 10,
                "name": "",
                "desc": "",
                "label": "",
                "points": [
                    {
                        "x": 539,
                        "y": 230
                    },
                    {
                        "x": 539,
                        "y": 40
                    },
                    {
                        "x": 575,
                        "y": 40
                    }
                ]
            },
            {
                "id": 11,
                "name": "Wort Out - BK",
                "desc": "Wort output from BK",
                "label": "",
                "points": [
                    {
                        "x": 660,
                        "y": 206
                    },
                    {
                        "x": 660,
                        "y": 289
                    },
                    {
                        "x": 643,
                        "y": 289
                    }
                ]
            },
            {
                "id": 12,
                "name": "Wort Out - Cooler",
                "desc": "Output from cooler",
                "label": "Wrt Out",
                "points": [
                    {
                        "x": 643,
                        "y": 333
                    },
                    {
                        "x": 660,
                        "y": 333
                    },
                    {
                        "x": 660,
                        "y": 352
                    }
                ]
            }
        ]
    }
}