
$("#add_lecture_form").submit((e) => {

    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-lecture",
        data: $("#add_lecture_form").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Added Successfully',
                    'Lecture has been added successfully',
                    'success'
                )

                $('#add_lecture_form').each(function () {
                    this.reset();
                });
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})


$("#add_course_form").submit((e) => {
    // $('#cover-spin').show(0)
    var form = $('#add_course_form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);

    // formData.append('CsThumbnail')
    e.preventDefault()
    $.ajax({
        url: "/admin/add-course",
        data: formData,
        method: "post",
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Added Successfully',
                    'Course has been added successfully',
                    'success'
                )

                $('#add_course_form').each(function () {
                    this.reset();
                });
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})

$("#edit_course_form").submit((e) => {
    // $('#cover-spin').show(0)
    var form = $('#edit_course_form')[0] // You need to use standard javascript object here
    var formData = new FormData(form);

    // formData.append('CsThumbnail')
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-course",
        data: formData,
        method: "post",
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Successfully edited',
                    'Course has been successfully edited',
                    'success'
                )
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})


$("#add_admin_form").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-admin",
        data: $("#add_admin_form").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Added Successfully',
                    'Admin has been added successfully',
                    'success'
                )

                $('#add_admin_form').each(function () {
                    this.reset();
                });
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})

$("#add_user_form").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/add-user",
        data: $("#add_user_form").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Added Successfully',
                    'User has been added successfully',
                    'success'
                )

                $('#add_user_form').each(function () {
                    this.reset();
                });
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})


$("#update_user_form").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-user",
        data: $("#update_user_form").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Updated Successfully',
                    'User has been updated successfully',
                    'success'
                )


            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})

$("#update_admin_form").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-admin",
        data: $("#update_admin_form").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Updated Successfully',
                    'Admin user has been updated successfully',
                    'success'
                )


            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})
$("#change_user_pass").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/user/change-password",
        data: $("#change_user_pass").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Changed Successfully',
                    'Password has been updated successfully',
                    'success'
                )


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter the current password',
                })
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})
$("#change_admin_pass").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/change-password",
        data: $("#change_admin_pass").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Changed Successfully',
                    'Password has been updated successfully',
                    'success'
                )


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter the current password',
                })
            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})


$("#admit_user_form").submit((e) => {
    // $('#cover-spin').show(0)
    // var form = $('#add_lecture_form')[0] // You need to use standard javascript object here
    // var formData = new FormData(form);
    e.preventDefault()
    $.ajax({
        url: "/admin/edit-user",
        data: $("#update_user_form").serialize(),
        method: "post",
        success: function (response) {
            // $('#cover-spin').hide(0)
            if (response.status) {
                Swal.fire(
                    'Updated Successfully',
                    'User has been updated successfully',
                    'success'
                )


            }

        },
        error: function (err) {
            // $('#cover-spin').hide(0)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    })
})
function admitUser(course_id) {
    let uid = document.getElementById("uid").value;
    let admitBt = document.getElementById(course_id)


    Swal.fire({
        title: 'Are you sure to admit?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, process!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/admin/admit-user",
                method: "get",
                data: {
                    "uid": uid,
                    "course_id": course_id,
                },
                success: function (response) {
                    // $('#cover-spin').hide(0)
                    if (response.status) {
                        admitBt.classList.replace("btn-success", "btn-danger");
                        admitBt.innerHTML = 'Leave';
                        Swal.fire(
                            'Admited Successfully',
                            'User has been successfully admitted',
                            'success'
                        ).then(() => {
                            location.reload()
                        })



                    }

                },
                error: function (err) {
                    // $('#cover-spin').hide(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    })
}


function leaveCourse(course_id) {
    let uid = document.getElementById("uid").value;
    let leaveBt = document.getElementById(course_id)


    Swal.fire({
        title: 'Are you sure to leave?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, process!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/admin/leave-course",
                method: "get",
                data: {
                    "uid": uid,
                    "course_id": course_id,
                },
                success: function (response) {
                    // $('#cover-spin').hide(0)
                    if (response.status) {
                        leaveBt.classList.replace("btn-danger", "btn-success");
                        leaveBt.innerHTML = 'Admit';
                        Swal.fire(
                            'Left the course successfully',
                            'User has been successfully left from the course',
                            'success'
                        ).then(() => {
                            location.reload()
                        })



                    }

                },
                error: function (err) {
                    // $('#cover-spin').hide(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    })
}

function removeUser(uid) {

    Swal.fire({
        title: 'Are you sure to remove?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, process!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/admin/remove-user",
                method: "get",
                data: {
                    "uid": uid,
                },
                success: function (response) {
                    // $('#cover-spin').hide(0)
                    if (response.status) {

                        Swal.fire(
                            'Removed the user successfully',
                            'User has been successfully left from the course',
                            'success'
                        ).then(() => {
                            location.reload()
                        })



                    }

                },
                error: function (err) {
                    // $('#cover-spin').hide(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    })
}

function removeAdmin(uid) {

    Swal.fire({
        title: 'Are you sure to remove?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, process!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/admin/remove-admin",
                method: "get",
                data: {
                    "uid": uid,
                },
                success: function (response) {
                    // $('#cover-spin').hide(0)
                    if (response.status) {

                        Swal.fire(
                            'Deleted successfully',
                            'Admin user has been successfully deleted ',
                            'success'
                        ).then(() => {
                            location.reload()
                        })



                    }

                },
                error: function (err) {
                    // $('#cover-spin').hide(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    })
}

function deleteVideo(vid) {
    course_id = document.getElementById('course_id').value;
    let lectureList = document.getElementById('lectureList');
    let child = document.getElementById(vid);


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/admin/delete-lecture",
                method: "get",
                data: {
                    "id": course_id,
                    "vid": vid,

                },
                success: function (response) {
                    // $('#cover-spin').hide(0)
                    if (response.status) {
                        Swal.fire(
                            'Deleted Successfully',
                            'Lecture has been deleted successfully',
                            'success'
                        )
                        lectureList.removeChild(child)

                    }

                },
                error: function (err) {
                    // $('#cover-spin').hide(0)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            })
        }
    })

}