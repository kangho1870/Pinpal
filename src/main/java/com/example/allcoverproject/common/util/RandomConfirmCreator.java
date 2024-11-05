package com.example.allcoverproject.common.util;

import java.util.Random;

public class RandomConfirmCreator {

    public static String createRandomGameCode() {

        String gameCode = "";

        Random random = new Random();

        for(int count = 0; count < 6; count++)
            gameCode += random.nextInt(10);

        return gameCode;
    }
}
