export const AvatarData = {
    'hair': ['short01', 'short02', 'short03', 'short04', 'short05', 'short06', 'short07', 'short08', 'short09', 'short10', 'short11', 'short12', 'short13', 'short14', 'short15', 'long01', 'long02', 'long03', 'long04', 'long05', 'long06', 'long07', 'long08', 'long09', 'long10', 'long11', 'long12', 'long13', 'long14', 'long15'],
    'eyes': ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15'],
    'mouth': ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15'],
    'eyeBrows': ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15'],
    'hairColor': ['0e0e0e', '3eac2c', '6a4e35', '85c2c6', '796a45', '562306', '592454', 'ab2a18', 'ac6511', 'afafaf', 'b9a05f', 'cb6820', 'dba3be', 'e5d7a3'],
    'skinColor': ['9e5622', '763900', 'ecad80', 'f2d3b1'],


    hairIndex: (data, hair) => {
        for (let i = 0; i < data.hair.length; i++)
            if (data.hair[i] === hair)
                return i
    },

    eyesIndex: (data, eyes) => {
        for (let i = 0; i < data.eyes.length; i++)
            if (data.eyes[i] === eyes)
                return i
    },

    mouthIndex: (data, mouth) => {
        for (let i = 0; i < data.mouth.length; i++)
            if (data.mouth[i] === mouth)
                return i
    },

    eyeBrowsIndex: (data, eyeBrows) => {
        for (let i = 0; i < data.eyeBrows.length; i++)
            if (data.eyeBrows[i] === eyeBrows)
                return i
    },

    hairColorIndex: (data, hairColor) => {
        for (let i = 0; i < data.hairColor.length; i++)
            if (data.hairColor[i] === hairColor)
                return i
    },

    skinColorIndex: (data, skinColor) => {
        for (let i = 0; i < data.skinColor.length; i++)
            if (data.skinColor[i] === skinColor)
                return i
    },
}
