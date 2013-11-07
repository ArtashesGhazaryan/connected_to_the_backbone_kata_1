var Tasky = {
    Model: Backbone.Model.extend({
        defaults: {
            title: 'new task'
        }
    }),
    View: Backbone.View.extend({
        tagName: 'li',
        template: '#newTaskTemplate',
        render: function(){

            var tplFnc = _.template($(this.template).html().trim());
            this.$el.html(
                tplFnc({'title': this.model.get('title')})
            );

            return this;
        }
    }),
    Collection: Backbone.Collection.extend({
        targetModel: this.Model
    }),
    CollectionView: Backbone.View.extend({
        tagName: 'ul',
        events: {
            'click form input[type="submit"]': 'createNewTask'
        },
        addTask: function(newTaskTitle){
            this.collection.add({title: newTaskTitle});

            return this;
        },
        createNewTask: function(e, attrs){
alert('asas');
            e.preventDefault();

            window.console.info(attrs);

            return this;
        },
        render: function(){
            this.collection.each(function(task){

                var newTask = new Tasky.View({model: task});
                newTask.render();
                
                this.$el.append(newTask.$el);
            }, this);

            $('body div').html(this.$el);

            return this;
        }
    })
};

var taskCollection = new Tasky.Collection();
var taskCollectionView = new Tasky.CollectionView({collection: taskCollection});

taskCollectionView.addTask('gnal gorci');
taskCollectionView.addTask('gal tun');
taskCollectionView.render();