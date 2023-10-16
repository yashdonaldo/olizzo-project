const User = require("../models/login");
const ProductData = require("../models/productadd")
const Details = require("../models/contact")
const bcrypt = require('bcrypt')
const ExcelJs = require('exceljs')
const bannerdata = require("../models/banner");
const comapnydata = require("../models/conpanyinfo")
const offerdata = require("../models/offer")
const Alllink = require("../models/link")


// html to pdf generate require things
const ejs = require("ejs");
const htmlpdf = require("html-pdf");
const fs = require("fs");
const path = require("path");


// Login Process Logic
const loadlogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}

const verifyLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const UserData = await User.findOne({ usersname: username });
        if (UserData) {
            if (UserData.password == password) {
                req.session.user_id = UserData._id
                res.redirect("/admin/home")
            } else {
                res.render("login", { message: "Username or Password is incorrect" })
            }
        } else {
            res.render("login", { message: "Username or Password is incorrect" })
        }
    } catch (error) {
        console.log(error.message)
    }
}

// Dashboard 
const loadDashboard = async (req, res) => {
    try {

        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        var page = 1;
        if (req.query.page) {
            page = req.query.page;
        }

        const limit = 3

        const data = await ProductData.find({
            $or: [
                { product_name: { $regex: ".*" + search + ".*", $options: "i" } },
                { product_discription: { $regex: ".*" + search + ".*", $options: "i" } },
                { catagories: { $regex: ".*" + search + ".*", $options: "i" } },

            ]
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await ProductData.find({
            $or: [
                { product_name: { $regex: ".*" + search + ".*", $options: "i" } },
                { product_discription: { $regex: ".*" + search + ".*", $options: "i" } },
                { catagories: { $regex: ".*" + search + ".*", $options: "i" } },

            ]
        }).countDocuments()

        res.status(200).render("home", {
            users: data,
            totalpages: Math.ceil(count / limit),
            currentpage: page
        })
    } catch (error) {
        console.log(error.message)
    }
}
// Logout
const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).redirect("/admin");
    } catch (error) {
        console.log(error.message)
    }
}

// Add new Product
const newProduct = async (req, res) => {
    try {
        res.render("new-product")
    } catch (error) {
        console.log(error.message)
    }
}
const addProduct = async (req, res) => {
    try {
        const name = req.body.pname;
        const price = req.body.price;
        const product_type = req.body.select;
        const product_discription = req.body.discription;
        const product_img = req.files;
        const model = req.body.model;

        const user = new ProductData({
            product_name: name,
            product_discription: product_discription,
            product_price: price,
            product_img: product_img,
            catagories: product_type,
            model: model,
        })
        const pData = await user.save();

        if (pData) {
            res.status(200).redirect('/admin/home')
        } else {
            res.render('new-product', { message: "Somthing Wrong" })
        }

    } catch (error) {
        console.log(error.message)
    }
}
// Edit Product 
const editProduct = async (req, res) => {
    try {
        const id = req.query.id;
        const userEdit = await ProductData.findById({ _id: id });
        if (userEdit) {
            res.render("updateproduct", { user: userEdit })
        } else {
            res.redirect("/admin/home")
        }
    } catch (error) {
        console.log(error.message)
    }
}
const updateProduct = async (req, res) => {
    try {
        if (req.files) {
            const updateData = await ProductData.findByIdAndUpdate({ _id: req.body.id }, {
                $set: {
                    product_name: req.body.pname,
                    product_discription: req.body.discription,
                    product_price: req.body.price,
                    product_img: req.files,
                    catagories: req.body.select
                }
            })
            res.redirect("/admin/home")
        } else {
            const updateData = await ProductData.findByIdAndUpdate({ _id: req.body.id }, {
                $set: {
                    product_name: req.body.pname,
                    product_discription: req.body.discription,
                    product_price: req.body.price,
                    // product_img: req.file.filename,
                    catagories: req.body.select
                }
            })
            res.redirect("/admin/home")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const deleteProduct = async (req, res) => {
    const id = req.query.id;
    const deleteData = await ProductData.deleteOne({ _id: id });
    res.redirect("/admin/home")
}

const query = async (req, res) => {
    try {
        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        var page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        const limit = 4

        const userData = await Details.find({

            $or: [
                { name: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } },
                { country: { $regex: ".*" + search + ".*", $options: "i" } },

            ]

        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Details.find({
        }).countDocuments()

        res.status(200).render("query", {
            user: userData,
            totalpages: Math.ceil(count / limit),
            currentpage: page
        })
    } catch (error) {
        console.log(error.message)
    }
}

const exportData = async (req, res) => {
    try {
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("My Users");

        worksheet.columns = [
            { header: "S no.", key: "s_no" },
            { header: "Name", key: "name" },
            { header: "Email id", key: "email" },
            { header: "Mobile no.", key: "phone" },
            { header: "Country", key: "country" },
            { header: "Message", key: "message" },
            { header: "Date", key: "date" },
        ];

        let counter = 1;

        const exportdata = await Details.find({});
        exportdata.forEach((user) => {
            user.s_no = counter;
            worksheet.addRow(user)
            counter++;
        })

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        })

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        );

        res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);

        return workbook.xlsx.write(res).then(() => {
            res.status(200);
        })

    } catch (error) {
        console.log(error.message)
    }
}

const exportpdf = async (req, res) => {
    try {
        const user = await Details.find({});
        const data = {
            user: user
        }
        const filepath = path.resolve(__dirname, "../template/views/admin/htmlToPdf.ejs");
        const htmlstring = fs.readFileSync(filepath).toString();
        let option = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        }
        const ejsdata = ejs.render(htmlstring, data);
        htmlpdf.create(ejsdata, option).toFile("users.pdf", (err, response) => {
            if (err) console.log(err);
            const pdfstore = path.resolve(__dirname, "../users.pdf");

            fs.readFile(pdfstore, (err, file) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Coudn't Download file")
                }
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", `attachment; filename="users.pdf"`);

                res.send(file);
            })
        })
    } catch (error) {
        console.log(error.message)
    }
}
const uploadbanner = async (req, res) => {
    try {
        res.render("bannerupload")
    } catch (error) {
        console.log(error.message)
    }
}
const banner = async (req, res) => {
    try {
        let ban = await bannerdata.find({})
        if (ban) {
            res.render("banner", { x: ban })
        } else {
            res.render("banner", { message: "Banner Not Found" })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const bannerAdd = async (req, res) => {
    try {
        const image = req.file.filename;
        const baner = new bannerdata({
            image: image
        });
        const bdata = await baner.save()
        if (bdata) {
            res.redirect("/admin/banner")
        } else {
            res.render("banner", { message: "Banner not Added" })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const bannerdelete = async (req, res) => {
    const id = req.query.id
    console.log(id)
    const deleteBanner = await bannerdata.deleteOne({ _id: id })
    res.redirect("/admin/banner")
}

const companyinfo = async (req, res) => {
    try {
        res.render("companyPara")
    } catch (error) {
        console.log(error.message)
    }
}
const companyupload = async (req, res) => {
    try {
        const coInfo = req.body.dicription;
        const image = req.files;
        const com_type = req.body.page;
        console.log(coInfo)

        const datac = new comapnydata({
            Company_info: coInfo,
            image: image,
            company_page: com_type
        });

        const cdata = await datac.save();
        console.log(cdata)
        if (cdata) {
            res.redirect("/admin/company-info")
        } else {
            res.render('companyPara', { message: "Data not save" })
        }


    } catch (error) {
        console.log(error.message)
    }

}

const offer = async (req, res) => {
    try {
        let off = await offerdata.find({})
        if (off) {
            res.render("offer", { x: off })
        } else {
            res.render("offer", { message: "Banner Not Found" })
        }
    } catch (error) {
        console.log(error.message)
    }
}
const offerupdate = async (req, res) => {
    try {
        res.render("offerupload")
    } catch (error) {
        console.log(error.message)
    }
}
const offeradd = async (req, res) => {
    try {
        const image = req.file.filename;
        const offfer = new offerdata({
            image_1: image
        });
        const offdata = await offfer.save()
        if (offdata) {
            res.redirect("/admin/offer")
        } else {
            res.render("offerupload", { message: "Banner not Added" })
        }
    } catch (error) {
        console.log(error.message)
    }
}
const offerdelete = async (req, res) => {
    const id = req.query.id
    console.log(id)
    const deleteBanner = await offerdata.deleteOne({ _id: id })
    res.redirect("/admin/offer")
}

const link = async (req, res) => {
    try {
        res.render("link")
    } catch (error) {
        console.log(error.message)
    }
}
const linkadd = async (req, res) => {
    try {
        const wLink = req.body.whatsapp;
        const iLink = req.body.instagram;
        const fLink = req.body.facebook;
        const yLink = req.body.youtube;
        const email = req.body.email;
        const phone = req.body.phone;
        const Slink = new Alllink({
            Whatsapp_Link: wLink,
            Instagram_Link: iLink,
            Facebook_Link: fLink,
            Youtube_Link: yLink,
            Email: email,
            Number: phone,
        });
        const Socal = await Slink.save()
        if (Socal) {
            res.redirect("/admin/link")
        } else {
            res.render("link", { message: "Link not Added" })
        }
    } catch (error) {
        console.log(error.message)
    }
}
const linkeditpage = (req, res)=>{
    Alllink.find({}).then((x)=>{
        res.render("linkeditpage", {x})
    })
}

const linkUpdate = async (req, res) => {
    try {
        const updatelink = await Alllink.findByIdAndUpdate({ _id: "652a6c7e8585b495c0592be8" }, {
            $set: {
                Whatsapp_Link: req.body.whatsapp,
                Instagram_Link: req.body.instagram,
                Facebook_Link: req.body.facebook,
                Youtube_Link: req.body.youtube,
                Email: req.body.email,
                Number: req.body.phone,
            }
        })
        res.redirect("/admin/home")

    } catch (error) {
        console.log(error.message)
    }
}





module.exports = {
    loadlogin, verifyLogin, loadDashboard, logout, newProduct, addProduct, editProduct, updateProduct, deleteProduct,
    query, exportData, exportpdf, banner, bannerAdd, bannerdelete, uploadbanner, companyinfo, companyupload, offer,
    offerupdate, offeradd, offerdelete, link, linkadd, linkUpdate, linkeditpage
}