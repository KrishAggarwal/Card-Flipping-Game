angular
  .module("myApp", ["ui.bootstrap", "ngAnimate", "ngSanitize"])
  .controller(
    "defaultController",
    function ($scope, $interval, $uibModal, $timeout) {
      // $scope.dimensions=4;

      // $scope.array.sort(() => Math.random() - 0.5);

      $scope.flippedItems = [];
      $scope.userStats = [];
      var timeInterval;
      $scope.count =
        $scope.attempts =
        $scope.seconds =
        $scope.minutes =
        $scope.ct =
          0;
      $scope.star1 = $scope.star2 = $scope.star3 = true;
      $scope.isEasy = $scope.isMedium = $scope.isHard = false;

      $scope.flipCard = (items) => {
        $scope.ct++;
        if (items.key == false) {
          items.key = true;
          $scope.flippedItems.push(items);
          $scope.count++;
        }
        if ($scope.count == 2) {
          // .back//textValue
          if (
            $scope.flippedItems[0].textValue == $scope.flippedItems[1].textValue
          ) {
            for (let index = 0; index < $scope.array.length; index++) {
              if (
                //id
                $scope.array[index].id == $scope.flippedItems[0].id ||
                $scope.array[index].id == $scope.flippedItems[1].id
              )
                $timeout(() => {
                  $scope.array[index].matched = true;
                }, 1000);
            }
            console.log("match found");
          } else {
            console.log("not matched");
            for (let index = 0; index < $scope.array.length; index++) {
              if (
                //id
                $scope.array[index].id == $scope.flippedItems[0].id ||
                $scope.array[index].id == $scope.flippedItems[1].id
              ) {
                $timeout(function () {
                  $scope.array[index].key = false;
                }, 1000);
                $timeout(() => {
                  $scope.array[index].unmatched = true;
                }, 2000);
              }
            }
          }
          $scope.attempts++;
          $scope.count = 0;
          $scope.flippedItems = [];
        }
        if ($scope.ct == 1) {
          timeInterval = $interval(() => {
            $scope.seconds++;
            if ($scope.seconds > 59) {
              $scope.minutes++;
              $scope.seconds = 0;
            }
            if ($scope.minutes > 59) {
            }
          }, 1000);
        }
        $scope.checkStars();
        //-----------------------won-----------------------//
        $scope.won = 0;
        for (let i = 0; i < $scope.array.length; ++i) {
          if ($scope.array[i].key == true) {
            $scope.won++;
          } else $scope.won = 0;

          if ($scope.won == $scope.array.length) {
            $scope.wonModal();

            if (localStorage.getItem("high-scores") != null)
              $scope.userStats = JSON.parse(
                localStorage.getItem("high-scores")
              );
            $scope.isSame = false;
            for (let i = 0; i < $scope.userStats.length; ++i) {
              if (
                $scope.userStats[i].name == $scope.name &&
                //&& $scope.userStats[i].dateOfBirth == $scope.dateOfBirth
                $scope.userStats[i].difficulty == $scope.dimensions
              ) {
                $scope.isSame = true;
                if ($scope.userStats[i].attempts > $scope.attempts) {
                  console.log("data changed");
                  $scope.userStats[i].attempts = $scope.attempts;
                  $scope.userStats[i].star1 = $scope.star1;
                  $scope.userStats[i].star2 = $scope.star2;
                  $scope.userStats[i].star3 = $scope.star3;
                }
              }
            }
            if ($scope.isSame == false) {
              $scope.userStats.push({
                name: $scope.name,
                attempts: $scope.attempts,
                dateOfBirth: $scope.dateOfBirth,
                difficulty: $scope.dimensions,
                star1: $scope.star1,
                star2: $scope.star2,
                star3: $scope.star3,
              });
            }
            localStorage.setItem(
              "high-scores",
              JSON.stringify($scope.userStats)
            );
            console.log("you won");
            console.log($scope.userStats);
          }
        }
        for (let i = 0; i < $scope.array.length; ++i)
          $scope.array[i].unmatched = false;
      };

      $scope.reset = () => {
        for (let i = 0; i < $scope.array.length; ++i) {
          $scope.array[i].key = false;
          $scope.array[i].matched = false;
        }
        $scope.count =
          $scope.attempts =
          $scope.seconds =
          $scope.minutes =
          $scope.ct =
            0;
        $scope.star1 = $scope.star2 = $scope.star3 = true;
        $interval.cancel(timeInterval);
        // $scope.newGameModal();
      };
      // $scope.checkStars = () => {
      //   if ($scope.attempts > 13 && $scope.attempts <= 16) {
      //     $scope.star3 = false;
      //   } else if ($scope.attempts > 16) $scope.star3 = $scope.star2 = false;
      // };

      $scope.newGameModal = function () {
        user = {};
        var modalInstance = $uibModal.open({
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "./newGameModal.html",
          controller: "newGameController",
          backdrop: "static",
          controllerAs: "$ctrl",
          size: "md",
          resolve: {
            user: function () {
              return user;
            },
          },
        });
        modalInstance.result.then(
          function (data) {
            // $scope.start();
            console.log("dafs");
            console.log(data);
            $scope.name = data.name;

            $scope.dateOfBirth = data.dateOfBirth;
            $scope.dimensions = data.dimensions;
            $scope.showHeading = true;

            if (data.dimensions == "Easy") {
              $scope.isEasy = true;
              $scope.isMedium = $scope.isHard = false;
              $scope.array = [
                {
                  id: 1,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 1,
                },
                {
                  id: 2,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 2,
                },
                {
                  id: 3,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 3,
                },
                {
                  id: 4,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 4,
                },
                {
                  id: 5,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 5,
                },
                {
                  id: 6,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 6,
                },
                {
                  id: 7,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 7,
                },
                {
                  id: 8,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 8,
                },
                {
                  id: 9,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 1,
                },
                {
                  id: 10,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 2,
                },
                {
                  id: 11,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 3,
                },
                {
                  id: 12,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 4,
                },
                {
                  id: 13,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 5,
                },
                {
                  id: 14,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 6,
                },
                {
                  id: 15,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 7,
                },
                {
                  id: 16,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 8,
                },
              ];
              $scope.checkStars = () => {
                if ($scope.attempts > 13 && $scope.attempts <= 16) {
                  $scope.star3 = false;
                } else if ($scope.attempts > 16)
                  $scope.star3 = $scope.star2 = false;
              };
              // $scope.array.sort(() => Math.random() - 0.5);
              console.log($scope.array);
            } else if (data.dimensions == "Medium") {
              $scope.isMedium = true;
              $scope.isEasy = $scope.isHard = false;
              $scope.array = [
                {
                  id: 1,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 1,
                },
                {
                  id: 2,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 2,
                },
                {
                  id: 3,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 3,
                },
                {
                  id: 4,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 4,
                },
                {
                  id: 5,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 5,
                },
                {
                  id: 6,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 6,
                },
                {
                  id: 7,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 7,
                },
                {
                  id: 8,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 8,
                },
                {
                  id: 9,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 9,
                },
                {
                  id: 10,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 10,
                },
                {
                  id: 11,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 11,
                },
                {
                  id: 12,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 12,
                },
                {
                  id: 13,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 13,
                },
                {
                  id: 14,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 14,
                },
                {
                  id: 15,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 15,
                },
                {
                  id: 16,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 16,
                },
                {
                  id: 17,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 17,
                },
                {
                  id: 18,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 18,
                },
                {
                  id: 19,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 1,
                },
                {
                  id: 20,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 2,
                },
                {
                  id: 21,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 3,
                },
                {
                  id: 22,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 4,
                },
                {
                  id: 23,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 5,
                },
                {
                  id: 24,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 6,
                },
                {
                  id: 25,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 7,
                },
                {
                  id: 26,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 8,
                },
                {
                  id: 27,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 9,
                },
                {
                  id: 28,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 10,
                },
                {
                  id: 29,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 11,
                },
                {
                  id: 30,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 12,
                },
                {
                  id: 31,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 13,
                },
                {
                  id: 32,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 14,
                },
                {
                  id: 33,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 15,
                },
                {
                  id: 34,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 16,
                },
                {
                  id: 35,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 17,
                },
                {
                  id: 36,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 18,
                },
              ];

              // $scope.array.sort(() => Math.random() - 0.5);
              
              $scope.checkStars = () => {
                if ($scope.attempts > 23 && $scope.attempts <= 26) {
                  $scope.star3 = false;
                } else if ($scope.attempts > 26)
                  $scope.star3 = $scope.star2 = false;
              };
            } else if (data.dimensions == "Hard") {
              $scope.isEasy = $scope.isMedium = false;
              $scope.isHard = true;
              $scope.array = [
                {
                  id: 1,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 1,
                },
                {
                  id: 2,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 2,
                },
                {
                  id: 3,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 3,
                },
                {
                  id: 4,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 4,
                },
                {
                  id: 5,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 5,
                },
                {
                  id: 6,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 6,
                },
                {
                  id: 7,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 7,
                },
                {
                  id: 8,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 8,
                },
                {
                  id: 9,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 9,
                },
                {
                  id: 10,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 10,
                },
                {
                  id: 11,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 11,
                },
                {
                  id: 12,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 12,
                },
                {
                  id: 13,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 13,
                },
                {
                  id: 14,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 14,
                },
                {
                  id: 15,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 15,
                },
                {
                  id: 16,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 16,
                },
                {
                  id: 17,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 17,
                },
                {
                  id: 18,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 18,
                },
                {
                  id: 19,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 19,
                },
                {
                  id: 20,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 20,
                },
                {
                  id: 21,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 21,
                },
                {
                  id: 22,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 22,
                },
                {
                  id: 23,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 23,
                },
                {
                  id: 24,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 24,
                },
                {
                  id: 25,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 25,
                },
                {
                  id: 26,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 26,
                },
                {
                  id: 27,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 27,
                },
                {
                  id: 28,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 28,
                },
                {
                  id: 29,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 29,
                },
                {
                  id: 30,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 30,
                },
                {
                  id: 31,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 31,
                },
                {
                  id: 32,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 32,
                },

                {
                  id: 33,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 1,
                },
                {
                  id: 34,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 2,
                },
                {
                  id: 35,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 3,
                },
                {
                  id: 36,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 4,
                },
                {
                  id: 37,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 5,
                },
                {
                  id: 38,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 6,
                },
                {
                  id: 39,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 7,
                },
                {
                  id: 40,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 8,
                },
                {
                  id: 41,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 9,
                },
                {
                  id: 42,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 10,
                },
                {
                  id: 43,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 11,
                },
                {
                  id: 44,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 12,
                },
                {
                  id: 45,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 13,
                },
                {
                  id: 46,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 14,
                },
                {
                  id: 47,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 15,
                },
                {
                  id: 48,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 16,
                },
                {
                  id: 49,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 17,
                },
                {
                  id: 50,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 18,
                },
                {
                  id: 51,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 19,
                },
                {
                  id: 52,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 20,
                },
                {
                  id: 53,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 21,
                },
                {
                  id: 54,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 22,
                },
                {
                  id: 55,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 23,
                },
                {
                  id: 56,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 24,
                },
                {
                  id: 57,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/AngryWalking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 25,
                },
                {
                  id: 58,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/thamJaBhai.png",
                  matched: false,
                  unmatched: false,
                  textValue: 26,
                },
                {
                  id: 59,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Laughing.png",
                  matched: false,
                  unmatched: false,
                  textValue: 27,
                },
                {
                  id: 60,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/LookMeInTheEyes.png",
                  matched: false,
                  unmatched: false,
                  textValue: 28,
                },
                {
                  id: 61,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Question.png",
                  matched: false,
                  unmatched: false,
                  textValue: 29,
                },
                {
                  id: 62,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Snoring.png",
                  matched: false,
                  unmatched: false,
                  textValue: 30,
                },
                {
                  id: 63,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Thumb.png",
                  matched: false,
                  unmatched: false,
                  textValue: 31,
                },
                {
                  id: 64,
                  key: false,
                  front: "./Emojis/CardFront.png",
                  back: "./Emojis/Winking.png",
                  matched: false,
                  unmatched: false,
                  textValue: 32,
                },
              ];
              $scope.array.sort(() => Math.random() - 0.5);
              $scope.checkStars = () => {
                if ($scope.attempts > 40 && $scope.attempts <= 48) {
                  $scope.star3 = false;
                } else if ($scope.attempts > 48)
                  $scope.star3 = $scope.star2 = false;
              };
            }
            $scope.reset();
          },
          function () {
            console.log("only closed");
            $scope.highScore();
            if ($scope.array) $scope.reset();
          }
        );
      };
      // $scope.newGameModal();

      $scope.wonModal = function () {
        user = {
          attempts: $scope.attempts,
          star1: $scope.star1,
          star2: $scope.star2,
          star3: $scope.star3,
          time: $scope.minutes + " min " + " : " + $scope.seconds + " sec",
        };
        var modalInstance = $uibModal.open({
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "./wonModal.html",
          controller: "wonController",
          backdrop: "static",
          controllerAs: "$ctrl",
          size: "md",
          resolve: {
            user: function () {
              return user;
            },
          },
        });
        modalInstance.result.then((close) => {
          $scope.reset();
        });
      };
      
      $scope.highScore = function () {
        user = {
          userStats: $scope.userStats,
          // name: $scope.name,
          // attempts: $scope.attempts,
          // star1: $scope.star1,
          // star2: $scope.star2,
          // star3: $scope.star3,
          // time: $scope.minutes + " min " + " : " + $scope.seconds + " sec",
        };
        var modalInstance = $uibModal.open({
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "./highScore.html",
          controller: "highScoreController",
          backdrop: "static",
          controllerAs: "$ctrl",
          size: "md",
          resolve: {
            user: function () {
              return user;
            },
          },
        });
        modalInstance.result.then((close) => {
          $scope.newGameModal();
        });
      };
      $scope.newGameModal();
    }
  )
  .controller("wonController", [
    "$scope",
    "$uibModalInstance",
    function ($scope, $uibModalInstance) {
      $scope.user = angular.copy(user);
      console.log($scope.user);
      $scope.newGameModal = function () {
        $uibModalInstance.close("close");
      };
      $scope.cancelModal = function () {
        $uibModalInstance.dismiss("close");
        //Game is going to restart in 5. 4. 3. 2. 1
      };
    },
  ])
  .controller("newGameController", [
    "$scope",
    "$uibModalInstance",
    function ($scope, $uibModalInstance) {
      // $scope.user = angular.copy(user);
      // console.log($scope.user);
      $scope.gameBegin = function () {
        if (
          $scope.fullName != undefined &&
          $scope.dateOfBirth != undefined &&
          $scope.dimensions != undefined
        ) {
          $uibModalInstance.close({
            name: $scope.fullName,
            dateOfBirth: $scope.dateOfBirth,
            dimensions: $scope.dimensions,
          });
        } else {
          toastr.info("All felids are required");
        }
      };
      $scope.cancelModal = function () {
        $uibModalInstance.dismiss("close");
        console.log($scope.name + " " + $scope.date + " " + $scope.dimensions);
      };
    },
  ])
  .controller("highScoreController", [
    "$scope",
    "$uibModalInstance",
    function ($scope, $uibModalInstance) {
      $scope.user = angular.copy(user);
      console.log($scope.user);
      if (localStorage.getItem("high-scores") != null)
        $scope.highScores = JSON.parse(localStorage.getItem("high-scores"));
      console.log($scope.highScores);
      $scope.newGameModal = function () {
        $uibModalInstance.close("close");
        console.log($scope.name + " " + $scope.date + " " + $scope.dimensions);
      };
    },
  ]);

// $scope.array.push($scope.tempArray.slice(0, 8));
// for (let i = 0; i < 8; ++i) {
// $scope.array[i].push($scope.tempArray[i]);

// console.log($scope.array[i + 8]);
// $scope.array[i] = $scope.tempArray[i];
// $scope.array[i + 8] = $scope.tempArray[i];
// $scope.array[i + 8].id = i + 8;
// }
// console.log($scope.array);
// for (let i = 0; i < 8; ++i) {
//   $scope.tempArray[i].id = i + 1;
// }
// console.log($scope.tempArray);
// $scope.array.sort(() => Math.random() - 0.5);

// for (let i = 0; i < $scope.limit/2; i++) {
//   $scope.array[i + $scope.limit / 2] =
//     $scope.array[i];
// }
// for (let i = 0; i < 16; ++i)
//   $scope.array[i].id = i + 1;
