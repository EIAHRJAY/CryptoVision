from App import create_app

# with app.app_context():
app = create_app()



if __name__ == '__main__':
    app.run(debug=True)

