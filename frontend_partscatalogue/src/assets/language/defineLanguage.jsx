// Loại ngôn ngữ;
const TYPE_LANGUAGE = ["VN", "ENGLISH", "ITALIA"]



//định nghĩa ngôn ngữ cho Page login
const LANGUAGES = {
    "VN": {
        LOGIN:{
            form: {
                title: "ĐĂNG NHẬP",
                username: "Tên đăng nhập",
                pass: "Mật khẩu",
                btn_login: "Đăng nhập",
                memberPass: "Ghi nhớ mật khẩu",
                forgotPass: "Quên mật khẩu ?"

            },
            footer: {
                about: "Website chuyên cung cấp mã số linh kiện phụ tùng cho tất cả dòng xe thuộc THACO AUTO sản xuất",
                contact: {
                    address: "KCN THACO Chu Lai, Xã Tam Hiệp, Huyện Núi Thành, Tỉnh Quảng Nam",
                    phone: "0235 3567 161"
                },
                copyRight: "© 2023 BẢN QUYỀN CỦA THACO AUTO"
            }
        }
    },

    "ENGLISH": {
        LOGIN:{
            form: {
                title: "LOGIN",
                username: "User name",
                pass: "Password",
                btn_login: "Login",
                memberPass: "Remember password",
                forgotPass: "Forgot password ?"
            },
            footer: {
                about: "Website specializes in providing spare parts codes for all vehicle models produced by THACO AUTO",
                contact: {
                    address: "THACO Chu Lai Industrial Park, Tam Hiep Commune, Nui Thanh District, Quang Nam Province",
                    phone: "0235 3567 161"
                },
                copyRight: "© 2023 COPYRIGHT OF THACO AUTO"
            }
        }
    }
    
}


export {TYPE_LANGUAGE, LANGUAGES}