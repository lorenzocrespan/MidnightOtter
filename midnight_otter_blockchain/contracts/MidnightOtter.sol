// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MidnightOtterRegistrationManager is AccessControl {
    // The following constants are required to manage the roles of the contract.
    bytes32 public constant PUBLIC_ADMIN_ROLE = keccak256("PUBLIC_ADMIN_ROLE");
    bytes32 public constant LAWYER_ROLE = keccak256("LAWYER_ROLE");
    bytes32 public constant EXPERT_ROLE = keccak256("EXPERT_ROLE");

    error ErrorOccurred(uint256 code);

    /**
     * @dev Mapping the user request (requestId) with the request.
     *
     * @notice Given a request id, return the request.
     *
     */
    mapping(uint256 => RequestRoleStruct) private roleRequests;

    // Counter of the request id and the pending requests.
    uint256 private _nextRequestRole;
    uint256 private _pendingRequestRole;

    /**
     * @dev Structure of the request of the role.
     *
     * @param requestId Id of the request.
     * @param role Role to request (keccak256 of the role name).
     * @param name Name of the user.
     * @param surname Surname of the user.
     * @param user User wallet address.
     *
     */
    struct RequestRoleStruct {
        uint256 requestId;
        bytes32 role;
        address user;
    }

    /**
     * @dev Constructor of the contract.
     *
     * @param admin Address of the public administrator.
     *
     */
    constructor(address admin) {
        // Set the role of the mantainer of the contract.
        _grantRole(PUBLIC_ADMIN_ROLE, admin);
    }

    /**
     * @dev Function to request the registration of a new user to the smart contract.
     *
     * @param role Role to request (keccak256 of the role name).
     * @param user Name of the user.
     *
     */
    function addRoleReq(bytes32 role, address user) external {
        // Check if the user has already requested the role.
        if (getRoleByAddress(user) != 0x00) revert ErrorOccurred(1);
        // Add the registration request to the list of pending requests.
        roleRequests[_nextRequestRole] = RequestRoleStruct(
            _nextRequestRole,
            role,
            user
        );
        // Increment the counter of the request id and the counter of the pending requests.
        _nextRequestRole++;
        _pendingRequestRole++;
    }

    /**
     * @dev Function to get the list of the requests in pending.
     *
     */
    function getRoleReq() external view returns (RequestRoleStruct[] memory) {
        // Create an array of requests with the length of the pending requests.
        RequestRoleStruct[] memory requestRoleArray = new RequestRoleStruct[](
            _pendingRequestRole
        );
        // Array index for the pending requests.
        uint256 pendingRequestIndex = 0;
        // Iterate over the list of requests and add the pending requests to the array.
        for (uint256 i = 0; i < _nextRequestRole; i++) {
            if (roleRequests[i].user != address(0))
                requestRoleArray[pendingRequestIndex++] = roleRequests[i];
        }
        return requestRoleArray;
    }

    /**
     * @dev Function to accept a role request and grant the role to the user or reject the request.
     *
     * @notice Only a public administrator can call this function.
     *
     * @param requestId Id of the request.
     * @param isAccepted Flag to indicate if the request is accepted or rejected.
     * @param user User wallet address.
     *
     */
    function responseRoleReq(
        address user,
        uint256 requestId,
        bool isAccepted
    ) external {
        // Check if the sender is a public administrator.
        require(hasRole(PUBLIC_ADMIN_ROLE, user));
        // Check if the request is valid.
        require(roleRequests[requestId].user != address(0));
        // Check if the request is accepted.
        if (isAccepted)
            // Grant the role to the user.
            _grantRole(
                roleRequests[requestId].role,
                roleRequests[requestId].user
            );
        // Delete the request.
        delete roleRequests[requestId];
        // Decrement the counter of the pending requests.
        _pendingRequestRole--;
    }

    function getRole(address user) external view returns (bytes32) {
        return getRoleByAddress(user);
    }

    /**
     * @dev Function to get the role of the given user address.
     *
     * @param user User to get the role.
     *
     * @return Role of the user (keccak256 of the role name).
     *
     */
    function getRoleByAddress(address user) public view returns (bytes32) {
        if (hasRole(PUBLIC_ADMIN_ROLE, user)) {
            return PUBLIC_ADMIN_ROLE;
        } else if (hasRole(EXPERT_ROLE, user)) {
            return EXPERT_ROLE;
        } else if (hasRole(LAWYER_ROLE, user)) {
            return LAWYER_ROLE;
        } else {
            return 0x00;
        }
    }
}

contract MidnightOtter is ERC721, ERC721Enumerable {
    error ErrorOccurred(uint256 code);

    /**
     * @dev Mapping the exihibit identifier (_nextExihibitUniqueId) with the exihibit data.
     *
     * @notice Given a exihibit identifier, return the exihibit data.
     *
     */
    mapping(uint256 => Exihibit) public exihibitProperties;

    /**
     * @dev Mapping the address of the user (user's wallet address) with the list of
     * exihibit transfer requests have the user as receiver.
     *
     * @notice Given a user's wallet address, return the list of exihibit transfer requests
     * have the user as receiver.
     *
     */
    mapping(address => uint256[]) public transferRequests;

    /**
     * @dev Mapping the case identifier (_nextCaseUniqueId) with the exihibit about the case.
     *
     * @notice Given a case number, return the case.
     *
     */
    mapping(uint256 => Case) public caseProperties;

    /**
     * @dev Mapping the case number (_nextCaseUniqueId) with the exihibit about the case.
     *
     * @notice Given a case number, return the list of exihibits about the case.
     *
     */
    mapping(uint256 => uint256[]) public caseExihibits;

    // Counter of the case identifier.
    uint256 private _nextCaseUniqueId;
    // Counter of the exihibit identifier.
    uint256 private _nextExihibitUniqueId;

    /**
     * @dev Structure of the case.
     *
     * @param caseInformation Properties of the case.
     * @param assignedParties List of users (address) assigned to the case.
     *
     */
    struct Case {
        CaseInfo caseInformation;
        address[] assignedParties;
    }

    /**
     * @dev Structure of the case information.
     *
     * @param caseNumber Identifier of the case.
     * @param caseName Name of the case.
     * @param assignedJudge Identifier of the assigned judge.
     * @param caseStatus Status of the case.
     */
    struct CaseInfo {
        uint256 caseNumber;
        string caseName;
        address assignedJudge;
        CaseStatus caseStatus;
    }

    /**
     * @dev Enum of the case status.
     *
     * @notice Open: the case is open and the exihibit can be added.
     * @notice Closed: the case is closed and the exihibit can't be added.
     *
     */
    enum CaseStatus {
        Open,
        Closed
    }

    /**
     * @dev Structure of the exihibit of the case.
     *
     * @param exhibitInformation Properties of the exihibit.
     * @param requestedTransferReceiver Address of the user who requested the transfer.
     * @param expertReports List of URI for the expert reports.
     * @param chainCustody List of events for the chain of custody.
     *
     */
    struct Exihibit {
        ExihibitInfo exhibitInformation;
        address requestedTransferReceiver;
        string[] expertReports;
        ChainCustody[] chainCustody;
    }

    /**
     * @dev Structure of the exihibit information.
     *
     * @param caseNumber Identifier of the case.
     * @param submitterId Address of the submitter officer.
     * @param objectId Identifier of the object.
     * @param objectDescription Description of the object.
     * @param seizedLocation Location of the seizure.
     * @param seizedEpochTime Date of the seizure.
     * @param isExihibit Flag to indicate if the object is an exihibit.
     *
     */
    struct ExihibitInfo {
        uint256 caseNumber;
        address submitterId;
        uint256 objectId;
        string objectDescription;
        string seizedLocation;
        uint256 seizedEpochTime;
        bool isExihibit;
    }

    /**
     *  @dev Structure of the chain of custody.
     *
     *  @param timestamp Timestamp of the event.
     *  @param releasedBy Name of the officer who released the object.
     *  @param receivedBy Name of the officer who received the object.
     *  @param action Action of the event.
     *
     */
    struct ChainCustody {
        uint256 timestamp;
        address releasedBy;
        address receivedBy;
        string action;
    }

    MidnightOtterRegistrationManager public registrationManager;

    /**
     * @dev Constructor of the contract.
     *
     * @param midnightOtterRegistrationManager Address of the MidnightOtterRegistrationManager contract.
     *
     */
    constructor(
        address midnightOtterRegistrationManager
    ) ERC721("MidnightOtter", "MOK") {
        // Set the role of the mantainer of the contract.
        registrationManager = MidnightOtterRegistrationManager(
            midnightOtterRegistrationManager
        );
    }

    /**
     * @dev Function to add a new role request.
     *
     * @param role Role to request (keccak256 of the role name).
     *
     */
    function addRoleRequest(bytes32 role) public {
        registrationManager.addRoleReq(role, msg.sender);
    }

    /**
     * @dev Function to get the list of the role requests.
     *
     * @return List of the role requests.
     *
     */
    function getRoleRequests()
        public
        view
        returns (MidnightOtterRegistrationManager.RequestRoleStruct[] memory)
    {
        return registrationManager.getRoleReq();
    }

    /**
     * @dev Function to accept a role request and grant the role to the user or reject the request.
     *
     * @notice Only a public administrator can call this function.
     *
     * @param requestId Id of the request.
     * @param isAccepted Flag to indicate if the request is accepted or rejected.
     *
     */
    function responseRoleRequest(uint256 requestId, bool isAccepted) public {
        registrationManager.responseRoleReq(msg.sender, requestId, isAccepted);
    }

    /**
     * @dev Function to get the role of the given user address.
     *
     * @param user User to get the role.
     *
     * @return Role of the user (keccak256 of the role name).
     *
     */
    function getRoleByAddress(address user) public view returns (bytes32) {
        return registrationManager.getRole(user);
    }

    /**
     * @dev Function to create a new case.
     *
     * @param caseName Name of the case.
     *
     */
    function createCase(string memory caseName) public {
        // Create a new case with the given name
        CaseInfo memory initialCaseStruct = CaseInfo(
            _nextCaseUniqueId,
            caseName,
            msg.sender,
            CaseStatus.Open
        );
        Case memory caseStruct = Case(initialCaseStruct, new address[](0));
        // Add the case to the list of cases.
        caseProperties[initialCaseStruct.caseNumber] = caseStruct;
        // Add the case to the list of cases
        caseExihibits[initialCaseStruct.caseNumber] = new uint256[](0);
        // Increment the counter of the case identifier
        _nextCaseUniqueId++;
    }

    /**
     * @dev Function to change the status of a case.
     *
     * @notice Only the assigned judge can call this function.
     *
     */
    function setCaseStatus(uint256 caseNumber, CaseStatus caseStatus) public {
        // Check if the sender is the assigned judge of the case
        require(
            caseProperties[caseNumber].caseInformation.assignedJudge ==
                msg.sender
        );
        // Update the status of the case
        caseProperties[caseNumber].caseInformation.caseStatus = caseStatus;
    }

    /**
     * @dev Function to assign a user to a case.
     *
     * @notice Only the assigned judge can call this function.
     *
     */
    function assignUserToCase(uint256 caseNumber, address user) public {
        // Check if the sender is the assigned judge of the case
        require(
            caseProperties[caseNumber].caseInformation.assignedJudge ==
                msg.sender
        );
        // Check if the user is already assigned to the case
        if (_hasAccessToCase(user, caseNumber)) revert ErrorOccurred(1);
        // Add the user to the list of assigned users
        caseProperties[caseNumber].assignedParties.push(user);
    }

    /**
     * @dev Function to get the list of the exihibits of a case.
     *
     * @param caseNumber Identifier of the case.
     *
     * @return List of the exihibits of the case.
     *
     */
    function getCaseExihibits(
        uint256 caseNumber
    ) public view returns (uint256[] memory) {
        return caseExihibits[caseNumber];
    }

    /**
     * @dev Function to get the properties of a case.
     *
     * @param caseNumber Identifier of the case.
     *
     * @return Properties of the case.
     *
     */
    function getCaseProperties(
        uint256 caseNumber
    ) public view returns (Case memory) {
        return caseProperties[caseNumber];
    }

    /**
     * @dev Function to add a new exihibit to a case.
     *
     * @notice Only the assigned users can call this function.
     *
     * @param caseNumber Identifier of the case.
     * @param objectDescription Description of the object.
     * @param seizedLocation Location of the seizure.
     *
     */
    function safeMint(
        address to,
        uint256 caseNumber,
        string memory objectDescription,
        string memory seizedLocation
    ) public {
        // Check if the sender is one of the assigned users
        require(_hasAccessToCase(msg.sender, caseNumber));
        // Generate a new exihibit identifier and mint the exihibit
        uint256 tokenId = _nextExihibitUniqueId++;
        _safeMint(to, tokenId);
        // Create a new exihibit with the given information
        Exihibit storage exihibit = exihibitProperties[tokenId];
        exihibit.exhibitInformation.caseNumber = caseNumber;
        exihibit.exhibitInformation.submitterId = msg.sender;
        exihibit.exhibitInformation.objectId = tokenId;
        exihibit.exhibitInformation.objectDescription = objectDescription;
        exihibit.exhibitInformation.seizedLocation = seizedLocation;
        exihibit.exhibitInformation.seizedEpochTime = block.timestamp;
        exihibit.requestedTransferReceiver = address(0);
        exihibit.exhibitInformation.isExihibit = false;
        exihibit.expertReports = new string[](0);
        // Add the exihibit to the list of exihibits of the case
        caseExihibits[caseNumber].push(tokenId);
        // Add the event to the chain of custody
        _updateCustodyChain(tokenId, msg.sender, address(0), "Create exihibit");
    }

    /**
     * @dev Function to set the validity of a specific exihibit.
     *
     * @param tokenId Id of the exihibit.
     *
     */
    function setExihibitValidity(
        uint256 caseNumber,
        uint256 tokenId,
        bool isValid,
        string memory actionPerformed
    ) public {
        // Check if the sender is the judge of the case
        require(
            caseProperties[caseNumber].caseInformation.assignedJudge ==
                msg.sender
        );
        // Update the validity of the exihibit
        exihibitProperties[tokenId].exhibitInformation.isExihibit = isValid;
        // Add the event to the chain of custody
        _updateCustodyChain(tokenId, msg.sender, address(0), actionPerformed);
    }

    /**
     * @dev Function to get the properties of a specific exihibit given the exihibit identifier.
     *
     * @param tokenId Id of the exihibit.
     *
     */
    function getExihibitProperties(
        uint256 tokenId
    ) public view returns (Exihibit memory) {
        return exihibitProperties[tokenId];
    }

    /**
     * @dev Function to get the exihibit owned by a specific user.
     *
     * @param user Address of the user.
     *
     */
    function getOwnerCases(
        address user
    ) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(user);
        uint256[] memory cases = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            cases[i] = tokenOfOwnerByIndex(user, i);
        }
        return cases;
    }

    /**
     * @dev Function to request a transfer for an exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param senderAddress Address of the entity performing the release.
     * @param receiverAddress Address of the entity receiving the release.
     *
     */
    function requestTrasfer(
        uint256 tokenId,
        address senderAddress,
        address receiverAddress
    ) public {
        // Check if the sender is the owner of the exihibit
        require(ownerOf(tokenId) == msg.sender);
        // Clean the previous transfer request for the exihibit
        if (exihibitProperties[tokenId].requestedTransferReceiver != address(0))
            delete transferRequests[
                exihibitProperties[tokenId].requestedTransferReceiver
            ];
        // Update exihibit information about the transfer request
        exihibitProperties[tokenId].requestedTransferReceiver = receiverAddress;
        // Add the exihibit to the list of exihibit transfer requests for the receiver
        transferRequests[exihibitProperties[tokenId].requestedTransferReceiver]
            .push(tokenId);
        // Add the event to the chain of custody
        _updateCustodyChain(
            tokenId,
            senderAddress,
            receiverAddress,
            "Requested transfer"
        );
    }

    function responseTrasfer(
        uint256 tokenId,
        address senderAddress,
        address receiverAddress,
        bool isAccepted
    ) public {
        // Check if the receiver of the transfer is the sender of the response
        require(
            exihibitProperties[tokenId].requestedTransferReceiver == msg.sender
        );
        if (isAccepted) {
            // Trasfer the ownership of the exihibit to the receiver
            _transfer(senderAddress, receiverAddress, tokenId);
            // Add the event to the chain of custody
            _updateCustodyChain(
                tokenId,
                senderAddress,
                receiverAddress,
                "Accepted transfer"
            );
        } else {
            // Add the event to the chain of custody
            _updateCustodyChain(
                tokenId,
                senderAddress,
                receiverAddress,
                "Rejected transfer"
            );
        }
        // Update exihibit information about the transfer request
        exihibitProperties[tokenId].requestedTransferReceiver = address(0);
        // Clean the transfer request for the exihibit
        delete transferRequests[
            exihibitProperties[tokenId].requestedTransferReceiver
        ];
    }

    /**
     * @dev Function to add an expert report to specific exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param expertReportUri URI of the expert report.
     *
     */
    function addExpertReportUri(
        uint256 tokenId,
        string memory expertReportUri
    ) public {
        // Check if the sender is the owner of the case or a shared user
        require(ownerOf(tokenId) == msg.sender);
        // Add expert report to the list of expert reports
        exihibitProperties[tokenId].expertReports.push(expertReportUri);
        // Add the event to the chain of custody
        _updateCustodyChain(tokenId, msg.sender, address(0), "Added report");
    }

    /**
     * @dev Function to update the chain of custody of specific exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param senderAddress Address of the entity performing the action.
     * @param receiverAddress Address of the entity receiving the action.
     * @param actionPerformed  Action performed on the exihibit.
     *
     */
    function _updateCustodyChain(
        uint256 tokenId,
        address senderAddress,
        address receiverAddress,
        string memory actionPerformed
    ) private {
        // Add the event to the chain of custody
        exihibitProperties[tokenId].chainCustody.push(
            ChainCustody(
                block.timestamp,
                senderAddress,
                receiverAddress,
                actionPerformed
            )
        );
    }

    /**
     * @dev Function to check if a user has access to a case.
     *
     * @param userAddress  Address of the user.
     * @param caseNumber Identifier of the case.
     *
     * @return True if the user has access to the case, false otherwise.
     *
     */
    function _hasAccessToCase(
        address userAddress,
        uint256 caseNumber
    ) private view returns (bool) {
        // Check if the user is one of the assigned users of the case
        for (
            uint256 i = 0;
            i < caseProperties[caseNumber].assignedParties.length;
            i++
        )
            if (caseProperties[caseNumber].assignedParties[i] == userAddress)
                return true;

        return false;
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
