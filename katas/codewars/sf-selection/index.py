class SF:
    def __init__(self, fighters, initial_position, moves):
        self.fighters = fighters
        self.curPos = initial_position
        self.moves = moves

    def getPosition(self, coor):
        return self.fighters[coor[0]][coor[1]]

    def isBlankSpace(self, coor):
        return self.getPosition(coor) == ''

    def movePosition(self, move):
        newPos = [self.curPos[0], self.curPos[1]]

        if move == 'up':
            if self.curPos[0] != 0:
                newPos[0] = self.curPos[0] - 1

                if self.isBlankSpace(newPos):
                    newPos = self.curPos
        elif move == 'down':
            if self.curPos[0] != len(self.fighters) - 1:
                newPos[0] = self.curPos[0] + 1

                if self.isBlankSpace(newPos):
                    newPos = [self.curPos[0], self.curPos[1]]
        elif move == 'left':
            if self.curPos[1] == 0:
                newPos[1] = len(self.fighters[self.curPos[0]]) - 1
            else:
                newPos[1] = self.curPos[1] - 1

            if self.isBlankSpace(newPos):
                self.curPos = [newPos[0], newPos[1]];
                return self.movePosition(move)

        elif move == 'right':
            if self.curPos[1] == len(self.fighters[self.curPos[0]]) - 1:
                newPos[1] = 0
            else:
                newPos[1] = self.curPos[1] + 1

            if self.isBlankSpace(newPos):
                self.curPos = [newPos[0], newPos[1]]
                return self.movePosition(move)

        self.curPos = [newPos[0], newPos[1]]
        return self.getPosition(newPos)

    def processMoves(self):
        allMoves = []
        for move in self.moves:
            allMoves.append(self.movePosition(move))

        return allMoves


ssf2fighters = [
    ['',       'Ryu',    'E.Honda',  'Blanka',  'Guile',   ''],
    ['Balrog', 'Ken',    'Chun Li',  'Zangief', 'Dhalsim', 'Sagat'],
    ['Vega',   'T.Hawk', 'Fei Long', 'Deejay',  'Cammy',   'M.Bison'],
]

initialPosition = [0, 1]
moves = ['left', 'right', 'down', 'left', 'left', 'up', 'left', 'left', 'right']

sf = SF(ssf2fighters, initialPosition, moves)
sf.processMoves()
