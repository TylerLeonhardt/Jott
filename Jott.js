if (Meteor.isClient) {
    
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

    //subscribe to that user data
    Meteor.subscribe("userData");

    Template.textGoesHere.helpers({
        user: function () {
            return Meteor.user();
        }
    });

    Template.textGoesHere.events({
        'input #box': function (e) {
            Meteor.call('click', $("#box").val());
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