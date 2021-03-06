package com.kafkasprout.backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class StartZoo {

  private String path;
  private String OS;

  // Start Zookeeper Constructor
  public StartZoo(String path, String OS) {
    this.path = path;
    this.OS = OS;
  }

  // Process Builder to input command line arguments to start Zookeeper
  public boolean run() {
    String[] command = new String[2];
    command[0] = OS.contains("windows") ? "zookeeper-server-start.bat" : "zookeeper-server-start";
    command[1] = path + "/" + "zookeeper.properties";

    ProcessBuilder processBuilder = new ProcessBuilder(command);

    try {
      System.out.println("Starting Zookeeper server");
      Process process = processBuilder.start();
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
        if (line.contains("binding to port")) {

          // If Zookeeper server started successfully, start Kafka server

          System.out.println("Zookeeper available and bound to port");
          boolean response = StartBroker.run(path + "/server.properties");
          if (response) {
            return true;
          }
        }
        // [2020-07-15 17:13:41,105] INFO [KafkaServer id=0] shut down completed
        // (kafka.server.KafkaServer)
      }
    } catch (IOException e) {

      // Print stack trace if zookeeper or kafka server failed

      e.printStackTrace();
      return false;
    }
    return false;
  }
}
