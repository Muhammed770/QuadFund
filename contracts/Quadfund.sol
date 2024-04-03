//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

enum EventStatus {
    Started,
    Ended
}

contract FundingContract is Initializable {

    address payable private _eventOwner;
    string public eventName;
    string public eventDesc;
    uint256 public prizePool;
    uint256 public startTime;
    uint256 public eventEndTime;
    uint256 public totalAmountContributed;
    uint256 private _totalUsers;
    uint256 private _numberOfProjectsListed;
    uint256 private _numberOfWithdrawal;

    EventStatus eventStatus;

    struct Contribution {
        address userAddress;
        uint256 amount;
        uint256 projectId;
    }

    struct ProjectDetails {
        string projectName;
        string about;
        string projectDesc;
        string projectLogo;
        string website;
        string twitter;
    }

    struct Project {
        uint256 projectId;
        address projectOwner;
        ProjectDetails details;
        bool isWithdrawnFund;
        uint256 amountWon;
        uint256 matchedPrizePool;
        uint256 contributionsReceived;
        uint256 votingPower;
        Contribution[] contributions;
    }

    struct User {
        address userAddress;
        Project project;
        Contribution[] contributionsGave;
    }

    mapping(address => User) public users;
    mapping(uint256 => Project) public projects;
    mapping(address => bool) public userExists;

    // Events
    event projectListed(address indexed owner, string projectName,string projectDesc,string projectLogo, uint256 projectId,string about,string website,string twitter);
    event contributed(address indexed user, uint256 amount, uint256 projectId);
    event resultPublished(uint256 indexed projectId,uint256 prizeWon);
    event updateMatchingPool(uint256 indexed projectId,uint256 matchingPrizePool);
    event fundsWithdrawn(uint256 indexed projectId, uint256 amount, uint256 date, address owner);

    function initialize(
        string calldata _eventName,
        string calldata _eventDesc,
        uint256 _prizePool,
        uint256 _duration
    ) external initializer payable {

        require(msg.value >= _prizePool,"Prize pool amount not send");
        _eventOwner = payable(tx.origin);
        eventName = _eventName;
        eventDesc = _eventDesc;
        prizePool = _prizePool;
        startTime = block.timestamp;
        eventEndTime = block.timestamp + _duration;
        eventStatus = EventStatus.Started;
    }

    function creatNewProject(
        string memory _projectName,
        string memory _projectDesc,
        string memory _projectLogo,
        string memory _projectAbout,
        string memory _projectWebsite,
        string memory _projectTwitter

    ) public {

        require(eventStatus != EventStatus.Ended,"Voting time period ended");
        require(!userExists[msg.sender], "User already submitted a project");

        _numberOfProjectsListed++;
        Project storage newProject = projects[_numberOfProjectsListed];
        newProject.projectId = _numberOfProjectsListed;
        newProject.isWithdrawnFund = false;
        newProject.details.projectName = _projectName;
        newProject.details.projectDesc = _projectDesc;
        newProject.details.projectLogo = _projectLogo;
        newProject.details.about = _projectAbout;
        newProject.details.website = _projectWebsite;
        newProject.details.twitter = _projectTwitter;
        newProject.amountWon = 0;
        newProject.projectOwner = msg.sender;
        newProject.contributionsReceived = 0;
        newProject.votingPower = 0;

        _totalUsers++;
        User storage newUser = users[msg.sender];
        newUser.userAddress = msg.sender;
        newUser.project = (newProject);
        
        userExists[msg.sender] = true;
        
        emit projectListed(msg.sender, _projectName,_projectDesc,_projectLogo,_numberOfProjectsListed,_projectAbout,_projectWebsite,_projectTwitter);
    }


    function contribute(uint256 _projectId, uint256 _amount) public payable {

        require(eventStatus != EventStatus.Ended,"Voting time period ended");
        require(users[msg.sender].userAddress != address(0),"User doesn't exist");
        require(userExists[msg.sender],"User has not listed any project");
        require(projects[_projectId].projectId > 0,"Project doesn't exist");
        require(msg.value >= _amount,"Not enough amount send");

        Project storage contributingProject = projects[_projectId];
        require(contributingProject.projectOwner != msg.sender,"Can'vote to your own project");

        User storage contributor = users[msg.sender];
        Contribution memory contribution;
        contribution.userAddress = msg.sender;
        contribution.projectId = _projectId;
        contribution.amount = _amount;
        contributor.contributionsGave.push(contribution);
        
        users[msg.sender].contributionsGave.push(contribution);
        
        uint256 counter;
        uint256  _totalVotingPower;

        for(counter = 1 ; counter <= _numberOfProjectsListed ; counter++){
            Project storage project = projects[counter];
            uint256 sumOfRoots;
            for(uint256 i = 0;i<project.contributions.length;i++){
                sumOfRoots += sqrt(project.contributions[i].amount);
            }
            project.votingPower = sumOfRoots * sumOfRoots;
            _totalVotingPower += sumOfRoots * sumOfRoots;
        }

        for(counter = 1 ; counter <= _numberOfProjectsListed ; counter++){
            Project storage project = projects[counter];
            project.amountWon = ((project.votingPower * prizePool)/_totalVotingPower) + project.contributionsReceived;
            emit updateMatchingPool(project.projectId,((project.votingPower * prizePool)/_totalVotingPower));
        }


        emit contributed(msg.sender, msg.value, _projectId);
    }

    
    

    function etherBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function publishResult() public {

        require(msg.sender == _eventOwner, "you not the owner");
        require(eventStatus != EventStatus.Ended);
        require(block.timestamp > eventEndTime, "End date not reached");

        uint256 counter;
       

        for(counter = 1 ; counter <= _numberOfProjectsListed ; counter++){
            Project storage project = projects[counter];
            project.amountWon = project.matchedPrizePool + project.contributionsReceived;
            emit resultPublished(project.projectId,project.amountWon);
        }

        eventStatus = EventStatus.Ended;

    }

    function withdrawFunds(uint256 _projectId) public {

        require(eventStatus == EventStatus.Ended);

        uint256 balance = address(this).balance;
        require(balance > 0, "nothing to withdraw");

        require(projects[_projectId].projectOwner == msg.sender,"You are not onwer of this project");

        uint256 availableBalance = projects[_projectId].amountWon;
        (bool success, ) = payable(msg.sender).call{value: availableBalance}("");

        require(success, "withdrawal failed");

        projects[_projectId].isWithdrawnFund = true;
        
        emit fundsWithdrawn(_projectId,availableBalance,block.timestamp,msg.sender);
    }

    

    function getProjectById(uint256 _projectId) public view returns (Project memory) {
        return projects[_projectId];
    }

    function eventOwner() public view returns (address payable) {
        return _eventOwner;
    }

    function getUserByAddress(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    function sqrt(uint x) internal pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    receive() external payable {}
}