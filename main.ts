radio.onReceivedValue(function (name, value) {
    if (name == "ball") {
        balls.push(game.createSprite(value, 0))
        new_ball = balls[balls.length - 1]
        new_ball.set(LedSpriteProperty.Direction, 180)
        new_ball.set(LedSpriteProperty.Brightness, 8)
    } else if (name == "hit") {
        game.addScore(1)
    }
})
input.onButtonPressed(Button.B, function () {
    b_ball = game.createSprite(me.get(LedSpriteProperty.X), me.get(LedSpriteProperty.Y) - 1)
    b_ball.set(LedSpriteProperty.Direction, 0)
    b_ball.set(LedSpriteProperty.Brightness, 5)
    balls.push(b_ball)
})
input.onButtonPressed(Button.A, function () {
    a_wall = game.createSprite(me.get(LedSpriteProperty.X), me.get(LedSpriteProperty.Y) - 1)
    a_wall.set(LedSpriteProperty.Blink, 1)
    a_wall.set(LedSpriteProperty.Brightness, 6)
    walls.push(a_wall)
})
let wall: game.LedSprite = null
let wall_ix = 0
let ball: game.LedSprite = null
let ball_ix = 0
let wall_collisions = 0
let a_wall: game.LedSprite = null
let b_ball: game.LedSprite = null
let new_ball: game.LedSprite = null
let walls: game.LedSprite[] = []
let balls: game.LedSprite[] = []
let me: game.LedSprite = null
let list: number[] = []
me = game.createSprite(2, 4)
balls = []
walls = []
game.setLife(10)
basic.forever(function () {
    if (input.rotation(Rotation.Roll) < -10) {
        me.change(LedSpriteProperty.X, -1)
        wall_collisions = 0
        for (let value of walls) {
            if (value.isTouching(me)) {
                wall_collisions += 1
            }
        }
        if (0 < wall_collisions) {
            me.change(LedSpriteProperty.X, 1)
        }
    } else if (input.rotation(Rotation.Roll) > 10) {
        me.change(LedSpriteProperty.X, 1)
        wall_collisions = 0
        for (let value2 of walls) {
            if (value2.isTouching(me)) {
                wall_collisions += 1
            }
        }
        if (0 < wall_collisions) {
            me.change(LedSpriteProperty.X, -1)
        }
    }
    if (input.rotation(Rotation.Pitch) < -10) {
        me.change(LedSpriteProperty.Y, -1)
        wall_collisions = 0
        for (let value3 of walls) {
            if (value3.isTouching(me)) {
                wall_collisions += 1
            }
        }
        if (0 < wall_collisions) {
            me.change(LedSpriteProperty.Y, 1)
        }
    } else if (input.rotation(Rotation.Pitch) > 10) {
        me.change(LedSpriteProperty.Y, 1)
        wall_collisions = 0
        for (let value4 of walls) {
            if (value4.isTouching(me)) {
                wall_collisions += 1
            }
        }
        if (0 < wall_collisions) {
            me.change(LedSpriteProperty.Y, -1)
        }
    }
    basic.pause(100)
})
basic.forever(function () {
    ball_ix = 0
    while (ball_ix < balls.length) {
        ball = balls[ball_ix]
        if (ball.get(LedSpriteProperty.Y) <= 0 && ball.get(LedSpriteProperty.Direction) == 0) {
            radio.sendValue("ball", ball.get(LedSpriteProperty.X))
            balls.removeAt(ball_ix).delete()
        } else if (ball.isTouching(me)) {
            balls.removeAt(ball_ix).delete()
            radio.sendValue("hit", 1)
        } else if (4 <= ball.get(LedSpriteProperty.Y)) {
            balls.removeAt(ball_ix).delete()
        } else {
            wall_ix = 0
            wall_collisions = 0
            while (wall_ix < walls.length) {
                wall = walls[wall_ix]
                if (wall.isTouching(ball)) {
                    walls.removeAt(wall_ix).delete()
                    wall_collisions += 1
                } else {
                    wall_ix += 1
                }
            }
            if (wall_collisions > 0) {
                balls.removeAt(ball_ix).delete()
            } else {
                ball_ix += 1
                ball.move(1)
            }
        }
    }
    basic.pause(100)
})
