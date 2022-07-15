var express = require('express');
var router = express.Router();
var adminHelpers = require("../helpers/admin-helpers")
var userHelpers = require("../helpers/user-helpers")
var fs = require('fs');


verifyLogin = (req, res, next) => {

  if (req.session.loggedIn && req.session.user.Admin) {
    next()
  } else {
    res.redirect('/admin-login')

  }


}

verify_super_admin = (req, res, next) => {
  if (req.session.loggedIn && req.session.user.Admin) {
    if (req.session.user.Super_Admin) {
      next()
    } else {
      res.send("You are not authorized to access this page")
    }
  } else {
    res.redirect('/admin-login')
  }



}

/* GET home page. */
router.get('/', verifyLogin, (req, res) => {
  res.redirect('/admin/dashboard')
});

router.get('/courses', verifyLogin, (req, res) => {

  let user = req.session.user
  console.log(user)

  adminHelpers.getCourses().then((coursesList) => {

    res.render('admin/courses', { coursesList, user });
  })

});

router.get('/profile', verifyLogin, (req, res) => {
  let user = req.session.user


  res.render('admin/profile', { user });


});


router.get('/lectures', verifyLogin, async (req, res) => {

  let user = req.session.user

  adminHelpers.getCourses().then((coursesList) => {

    res.render('admin/lectures', { coursesList, user });
  })

});

router.get('/lectures/all_videos/', verifyLogin, async (req, res) => {

  let user = req.session.user

  let course_id = req.query.id

  adminHelpers.getLectures(course_id).then((lecturesList) => {

    res.render('admin/lectures-list', { lecturesList, user });
  })

});

router.get('/delete-lecture/', verifyLogin, async (req, res) => {

  let course_id = req.query.id
  let video_id = req.query.vid


  adminHelpers.deleteLecture(course_id, video_id).then(() => {

    res.json({ status: true })
  })

});


router.get('/add-user', verifyLogin, (req, res) => {
  let user = req.session.user

  res.render('admin/add-user', { user });

});

router.get('/add-admin', verify_super_admin, (req, res) => {
  let user = req.session.user

  res.render('admin/add-admin', { user });

});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin-login')
});

router.get('/users', verifyLogin, (req, res) => {
  let user = req.session.user;

  adminHelpers.getUsers().then((userList) => {

    res.render('admin/users', { userList, user });
  })


});

router.get('/admins', verify_super_admin, (req, res) => {
  let user = req.session.user;

  adminHelpers.getAdmins(user._id).then((adminsList) => {

    res.render('admin/admins', { adminsList, user });
  })


});

router.get('/my-courses', verifyLogin, (req, res) => {
  let user = req.session.user

  userHelpers.getEnrolledCourses(user._id).then((coursesList) => {
    res.render('user/my-courses', { coursesList, user });
  })

});

router.get('/edit-user/', verifyLogin, async (req, res) => {
  let user = req.session.user;
  let uid = req.query.id;
  let enrolledCourses = await userHelpers.getEnrolledCourses(uid);
  let notEnrolledCourses = await userHelpers.getNotEnrolledCourses(uid);


  adminHelpers.getUser(uid).then((userData) => {

    res.render('admin/edit-user', { userData, enrolledCourses, notEnrolledCourses, user });
  })


});

router.get('/change-password', verifyLogin, (req, res) => {
  let user = req.session.user


  res.render('admin/change_pass', { user });


});

router.get('/edit-admin/', verifyLogin, async (req, res) => {
  let user = req.session.user;
  let uid = req.query.id;

  adminHelpers.getAdmin(uid).then((adminData) => {

    res.render('admin/edit-admin', { adminData, user });
  })


});

router.get('/admit-user', verifyLogin, (req, res) => {
  // let courseId = req.body.id
  // adminHelpers.getCourseDetails(courseId).then((course) => {
  //     res.render('user/course-details', { course });
  // })

  let course_id = req.query.course_id;
  let uid = req.query.uid;


  userHelpers.enrollCourse(course_id, uid).then((order) => {
    // console.log(order)
    res.json({ status: true })
  })
});

router.get('/leave-course', verifyLogin, (req, res) => {
  // let courseId = req.body.id
  // adminHelpers.getCourseDetails(courseId).then((course) => {
  //     res.render('user/course-details', { course });
  // })

  let course_id = req.query.course_id;
  let uid = req.query.uid;


  adminHelpers.leaveCourse(course_id, uid).then((order) => {
    // console.log(order)
    res.json({ status: true })
  })
});

router.post('/edit-user', verifyLogin, (req, res) => {
  let uid = req.body.id;

  adminHelpers.updateUser(uid, req.body).then(() => {
    res.json({ status: true })
  })


});

router.post('/edit-admin', verifyLogin, (req, res) => {
  let uid = req.body.id;
  if (req.body.Type == "Super") {
    req.body.Super_Admin = true

  } else {
    req.body.Super_Admin = false

  }
  adminHelpers.updateAdmin(uid, req.body).then(() => {
    res.json({ status: true })
  })


});

router.post('/change-password', verifyLogin, (req, res) => {
  let uid = req.body.id;
  delete req.body.CnfPassword;

  adminHelpers.changePass(uid, req.body).then((status) => {
    res.json(status)
  })


});


router.get('/remove-user', verifyLogin, (req, res) => {
  let uid = req.query.uid;

  adminHelpers.removeUser(uid).then(() => {
    res.json({ status: true })
  })


});

router.get('/remove-admin', verify_super_admin, (req, res) => {
  let uid = req.query.uid;

  adminHelpers.removeAdmin(uid).then(() => {
    res.json({ status: true })
  })


});

router.post('/add-user', verifyLogin, (req, res) => {
  delete req.body.CnfPassword
  delete req.body.Agreement
  req.body.UID = Date.now();
  userHelpers.signUpFunction(req.body).then((response) => {
    res.json({ status: true })

  })

})

router.post('/add-admin', verify_super_admin, (req, res) => {
  req.body.Admin = true

  if (req.body.Type == "Super") {
    req.body.Super_Admin = true

  } else {
    req.body.Super_Admin = false

  }

  delete req.body.CnfPassword
  adminHelpers.addAdmin(req.body).then((response) => {
    res.json({ status: true })

  })

})


router.post('/login', (req, res) => {
  adminHelpers.loginFunction(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/admin/dashboard')
    } else {
      req.session.loginError = "Invalid username or password"
      res.redirect('/admin-login')
    }
  })

})

router.get('/dashboard', verifyLogin, async (req, res) => {
  let user = req.session.user
  console.log(user)
  let coursesList = await adminHelpers.getCourses()
  let usersList = await adminHelpers.getUsers()

  res.render('admin/dashboard', { user, coursesList, usersList });
});


router.get('/add-course', verifyLogin, (req, res) => {
  let user = req.session.user;

  res.render('admin/add-course', { user })
})

router.post('/add-course', verifyLogin, (req, res) => {

  adminHelpers.addCourse(req.body, (id) => {
    let image = req.files.CsThumbnail
    image.mv('./public/uploads/course-thumbnail/' + id + '.jpg', (err, done) => {
      if (!err) {
        // res.redirect("/admin/add-course")
        res.json({ status: true })
      } else {
        console.log(err)
      }
    })

  })

})



router.get('/edit-course/', verifyLogin, async (req, res) => {
  let courseId = req.query.id
  let user = req.session.user;
  let course = await adminHelpers.getCourseDetails(courseId)
  res.render('admin/edit-course', { course, user })

})

router.post('/edit-course', verifyLogin, (req, res) => {
  let courseId = req.body.id

  adminHelpers.updateCourse(courseId, req.body).then(() => {

    if (req.files) {
      let image = req.files.CsThumbnail
      image.mv('./public/uploads/course-thumbnail/' + courseId + '.jpg').then((err, done) => {
        if (!err) {
          // res.redirect("/admin/add-course")
          res.json({ status: true })
        } else {
          console.log(err)
        }
      })


    } else {
      res.json({ status: true })


    }

  })
})

router.get('/delete-course/', verifyLogin, (req, res) => {
  let courseId = req.query.id

  adminHelpers.deleteCourse(courseId).then((response) => {
    fs.unlink('./public/uploads/course-thumbnail/' + courseId + '.jpg', () => { })
    res.redirect('/admin/courses')
  })


})


router.get('/add-lecture', verifyLogin, (req, res) => {
  let user = req.session.user
  adminHelpers.getCourses().then((coursesList) => {
    res.render('admin/add-lecture', { coursesList, user })

  })
})

router.post('/add-lecture', verifyLogin, async (req, res) => {
  let course_id = req.body.Course
  delete req.body.Course

  adminHelpers.addLecture(course_id, req.body).then((response) => {
    res.json({ status: true })
  })

})




module.exports = router;
