if (Meteor.isClient) {

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

    //subscribe to that user data
    Meteor.subscribe("userData");

    // counter starts at 0
    Session.setDefault("counter", 0);

    Template.hello.user = function () {
        return Meteor.user();
    }

    Template.hello.helpers({
        counter: function () {
            return Session.get("counter");
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set("counter", Session.get("counter") + 1);
            Meteor.call('click', document.getElementById("box").value);

        },
        'keyup textarea': function () {
            // increment the counter when button is clicked
            Session.set("counter", Session.get("counter") + 1);
            Meteor.call('click', document.getElementById("box").value);

        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

    Accounts.onCreateUser(function (options, user) {
        user.text = "asdf";
        return user;
    });

    //publishes all userdata
    Meteor.publish("userData", function () {
        return Meteor.users.find({}, {});
    });

}

Meteor.methods({
    click: function (str) {
        Meteor.users.update({
            _id: this.userId
        }, {
            $set: {
                "text": str
            }
        });
        console.log(str);
    },
});