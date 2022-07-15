
var db = require('../config/connection')
var collection = require('../config/collections')
const bycrypt = require('bcrypt')
var objectId = require('mongodb').ObjectID
const { use } = require('../routes/user')
const collections = require('../config/collections')
// const productHelpers = require('./product-helpers')
module.exports = {
    loginFunction: (userData) => {
        return new Promise(async (resolve, reject) => {

            let response = {}
            let user = await db.get().collection(collection.ADMINS_COLLECTIONS).findOne({ Email: userData.Email })
            console.log(userData.Password)
            if (user) {
                bycrypt.compare(userData.Password, user.Password).then((status) => {

                    if (status) {
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('login failed')
                        resolve({ status: false })
                    }
                })
            } else {
                console.log('login failed ')
                resolve({ status: false })
            }

        })
    },

    changePass: (uid, userData) => {
        return new Promise(async (resolve, reject) => {

            let response = {}
            let user = await db.get().collection(collection.ADMINS_COLLECTIONS).findOne({ _id: objectId(uid) })
            userData.Password = await bycrypt.hash(userData.Password, 10)

            if (user) {
                bycrypt.compare(userData.CurrentPass, user.Password).then((status) => {

                    if (status) {
                        db.get().collection(collection.ADMINS_COLLECTIONS).updateOne(
                            { _id: objectId(uid) },
                            { $set: { Password: userData.Password } }
                        )
                        resolve({ status: true })
                    } else {
                        console.log('login failed')
                        resolve({ status: false })
                    }
                })
            } else {
                // console.log('login failed ')
                resolve({ status: false })
            }

        })
    },

    addAdmin: async (admin_data, callback) => {
        admin_data.Password = await bycrypt.hash(admin_data.Password, 10)

        db.get().collection(collection.ADMINS_COLLECTIONS).insertOne(admin_data).then((data) => {
            callback(data.ops[0]._id)
        })
    },

    getUsers: () => {
        return new Promise(async (resolve, reject) => {
            let userList = await db.get().collection(collection.USERS_COLLECTIONS).find().toArray()

            resolve(userList)
        })

    },

    getAdmins: (loggedUserID) => {
        return new Promise(async (resolve, reject) => {
            let adminsList = await db.get().collection(collection.ADMINS_COLLECTIONS).find({ _id: { $ne: objectId(loggedUserID) } }).toArray()

            resolve(adminsList)
        })

    },

    addCourse: (course, callback) => {
        db.get().collection(collection.COURSES_COLLECTIONS).insertOne(course).then((data) => {
            callback(data.ops[0]._id)

        })
    },

    addLecture: (courseId, lecture) => {

        return new Promise(async (resolve, reject) => {
            let lectureExit = await db.get().collection(collection.COURSES_COLLECTIONS).findOne({ _id: objectId(courseId) })
            if (lectureExit.Lectures) {

                db.get().collection(collection.COURSES_COLLECTIONS).updateOne({ _id: objectId(courseId) }, {

                    $push: { Lectures: lecture }

                }).then((response) => {
                    resolve(response)
                })



            } else {

                db.get().collection(collection.COURSES_COLLECTIONS).updateOne({ _id: objectId(courseId) }, { $set: { "Lectures": [lecture] } },).then((response) => {
                    resolve()
                })
            }
        })
    },

    getUser: (uid) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USERS_COLLECTIONS).findOne({ _id: objectId(uid) })

            resolve(user)
        })

    },

    getAdmin: (uid) => {
        return new Promise(async (resolve, reject) => {
            let admin = await db.get().collection(collection.ADMINS_COLLECTIONS).findOne({ _id: objectId(uid) })

            resolve(admin)
        })

    },


    updateUser: (uid, userData) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.USERS_COLLECTIONS).findOneAndUpdate({ _id: objectId(uid) }, {
                $set: {
                    "Username": userData.Username,
                    "Email": userData.Email,
                    "Phone": userData.Phone
                }
            }, { returnDocument: 'after' }
            ).then((response) => {
                resolve(response)
            })
        })

    },

    updateAdmin: (uid, userData) => {
        return new Promise(async (resolve, reject) => {

            db.get().collection(collection.ADMINS_COLLECTIONS).findOneAndUpdate({ _id: objectId(uid) }, {
                $set: {
                    "Username": userData.Username,
                    "Email": userData.Email,
                    "Type": userData.Type,
                    "Super_Admin": userData.Super_Admin
                }
            }, { returnDocument: 'after' }
            ).then((response) => {
                resolve(response)
            })
        })

    },

    getCourses: () => {
        return new Promise(async (resolve, reject) => {
            let courseList = await db.get().collection(collection.COURSES_COLLECTIONS).find().toArray()

            resolve(courseList)
        })

    },


    // getLectures: () => {
    //     return new Promise(async (resolve, reject) => {
    //         let lectureList = await db.get().collection(collection.LECTURES_COLLECTIONS).find().toArray()

    //         resolve(lectureList)
    //     })

    // },

    getLectures: (course_id) => {
        return new Promise(async (resolve, reject) => {
            let lectureList = await db.get().collection(collection.COURSES_COLLECTIONS).aggregate(
                [
                    {
                        $match: {
                            _id: objectId(course_id)
                        }
                    },
                    { $unwind: '$Lectures' },
                    {
                        $sort: {
                            'Lectures.LtNo': 1
                        }
                    },
                    {
                        $group: {
                            _id: '$_id', 'Videos': {
                                $push:
                                    '$Lectures'
                            }
                        }
                    },
                    {
                        $project: {
                            'Lectures': '$Videos'
                        }
                    }


                ]
            ).toArray()
            console.log(lectureList[0])
            resolve(lectureList[0])
        })


    },

    deleteCourse: (courseId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.COURSES_COLLECTIONS).removeOne({ _id: objectId(courseId) }).then((response) => {
                resolve(response)
            })
        })
    },

    removeUser: (uid) => {
        return new Promise(async (resolve, reject) => {
            let userCourses = await db.get().collection(collection.USER_ENROLLED_COLLECTIONS).findOne({ user: objectId(uid) })

            if (userCourses) {
                await db.get().collection(collection.USERS_COLLECTIONS).removeOne({ _id: objectId(uid) })
                await db.get().collection(collection.USER_ENROLLED_COLLECTIONS).removeOne({ user: objectId(uid) })
                resolve()

            } else {
                await db.get().collection(collection.USERS_COLLECTIONS).removeOne({ _id: objectId(uid) })

                resolve()
            }

        })
    },

    removeAdmin: (uid) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.ADMINS_COLLECTIONS).removeOne({ _id: objectId(uid) })
            resolve()

        })
    },

    deleteLecture: (courseId, videoId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.COURSES_COLLECTIONS).updateOne(
                { _id: objectId(courseId) },
                { $pull: { Lectures: { VID: videoId } } },
                false, // Upsert
                true, // Multi

            ).then((response) => {
                resolve(response)
            })
        })
    },

    leaveCourse: (courseId, uid) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_ENROLLED_COLLECTIONS).updateOne(
                { user: objectId(uid) },
                { $pull: { courses_enrolled: { course: objectId(courseId) } } },
                false, // Upsert
                true, // Multi

            ).then((response) => {
                resolve(response)
            })
        })
    },

    getCourseDetails: (courseId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.COURSES_COLLECTIONS).findOne({ _id: objectId(courseId) }).then((course) => {
                resolve(course)
            })
        })
    },

    updateCourse: (courseId, courseDetails) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.COURSES_COLLECTIONS).updateOne({ _id: objectId(courseId) }, {

                $set: {
                    Title: courseDetails.Title,
                    CsCategory: courseDetails.CsCategory,
                    Language: courseDetails.Language,
                    BriefDesc: courseDetails.BriefDesc,
                    Desc: courseDetails.Desc,
                    Price: courseDetails.Price,

                }
            }).then((response) => {
                resolve()
            })
        })
    },


    getProducts: () => {
        return new Promise(async (resolve, reject) => {
            let productsList = await db.get().collection(collection.PRODUCTS_COLLECTIONS).find().toArray()

            resolve(productsList)
        })

    },
}