package com.example.demo;

public class Main {

  public static void main(String[] args) {
    String configPath = "C:\\kafka_2.13-2.5.0\\config\\";
    String OS = System.getProperty("os.name").toLowerCase();
    RunZoo zooThread = new RunZoo(configPath, OS);
    zooThread.run();
  }
}
