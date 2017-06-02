//referensi
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();
var user = new UserViewModel({
    email: "username@domain.com",
    password: "password"
});

//dialog sukses atau tidak
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

//definisi loaded attribut untuk halaman(UI) komponen
exports.loaded = function(args) {
    page = args.object;
    //customize its look with some native iOS APIs.
if (page.ios) {
    var navigationBar = frameModule.topmost().ios.controller.navigationBar;
    navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
}
    page.bindingContext = user;
};

//fungsi signIn
exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account. Please Register!",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
        });
};

//fungsi pendaftaran baru
exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

//mendefinisikan variable frameModule
var page;


var email;


/*
//konstruktor observableModule
var observableModule = require("data/observable");

var user = new observableModule.fromObject({
    email: "user@domain.com",
    password: "password"
});
*/